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

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

await database();

io.use((socket, next) => {
    const { token } = socket.handshake.query;
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch(ex) {
        console.log('Autenticacion fallida');
        next(new Error('Autenticación fallida'));
    }
});

io.on('connection', socket => {
    console.log(`A new connection in the server ${ socket.id }`);
    socket.emit('message', 'Welcome to SignalFlags');
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