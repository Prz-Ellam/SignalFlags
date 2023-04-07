import './configuration/env.js';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import jwt from 'jsonwebtoken';

import database from './configuration/database.js';
import userRouter from './routes/user.routes.js';
import groupRouter from './routes/group.routes.js';
import homeworkRouter from './routes/homework.routes.js';
import imageRouter from './routes/image.routes.js';
import chatRouter from './routes/chat.routes.js';
import chatGroupRouter from './routes/chat-group.routes.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';

import Chat from './models/chat.model.js';
import Message from './models/message.model.js';
import UserSocket from './models/userSocket.model.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

await database();

await UserSocket.deleteMany({});

var userId = null;
io.use((socket, next) => {
    const { token } = socket.handshake.auth;
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        userId = decode.id;
        next();
    }
    catch(ex) {
        console.log('Autenticacion fallida');
        next(new Error('Autenticación fallida'));
    }
});

const chatStream = Chat.watch([
    { $match: { "operationType": { $in: [ "insert", "update", "replace" ] } } }
], { fullDocument: 'updateLookup' });

const messageStream = Message.watch([
    { $match: { "operationType": { $in: [ "insert", "update", "replace" ] } } }
], { fullDocument: 'updateLookup' });

chatStream.on('change', async (change) => {
    if (change.operationType == 'insert' || change.operationType == 'update') {
        const members = change.fullDocument?.members;
        const sockets = await UserSocket.find({ user: { $in: members }});
        const socketIds = sockets.map(socket => socket._id);

        io.to(socketIds).emit('pushNotification', {});
    }
});

messageStream.on('change', async (change) => {
    if (change.operationType == 'insert') {
        const chatId = change.fullDocument?.chat;
        const chat = await Chat.findOne({ _id: chatId });
        const members = chat?.members;

        const sockets = await UserSocket.find({ user: { $in: members }});
        const socketIds = sockets.map(socket => socket._id);

        io.to(socketIds).emit('message', change.fullDocument.text);
    }
});

io.on('connection', async (socket) => {
    console.log(`A new connection in the server ${ socket.id }`);

    const userSocket = new UserSocket({
        _id: socket.id,
        user: userId
    });
    await userSocket.save();

    socket.emit('message', 'Welcome to SignalFlags');

    socket.on('disconnect', async () => {
        await UserSocket.deleteOne({ _id: socket.id });

        const activeSockets = await UserSocket.find({ user: userId });
        const activeSocketsCount = activeSockets.length;
        console.log(activeSocketsCount);

        // Si hay 0 significa que el usuario se desconecto
        if (activeSocketsCount == 0) {
            const chats = await Chat.find({ members: userId });
            const allMembers = chats.reduce((acc, chat) => {
                return acc.concat(chat.members);
              }, []);

            const sockets = await UserSocket.find({ user: { $in: allMembers }});
            const socketIds = sockets.map(socket => socket._id);

            io.to(socketIds).emit('userDisconnect', );
        }
    });
});

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());
app.use('/api/v1/images', express.static('../uploads/'));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/chatGroups', chatGroupRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/homeworks', homeworkRouter);

app.use(notFoundMiddleware);

httpServer.listen(app.get('port'), async () => {
    console.log(`Server started in port ${ app.get('port') }`);
});