import jwt from 'jsonwebtoken';

import Call from '../models/call.model.js';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';
import Group from '../models/group.model.js';
import Homework from '../models/homework.model.js';
import Post from '../models/post.model.js';
import UserSocket from '../models/userSocket.model.js';

export default async function(io) {

    await UserSocket.deleteMany({});

    io.use((socket, next) => {
        const { token } = socket.handshake.auth;
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            socket.userId = decode.id;
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

    const messageObserver = Message.watch([
        { $match: { "operationType": { $in: [ "insert", "update", "replace" ] } } }
    ], { fullDocument: 'updateLookup' });

    const groupStream = Group.watch([
        { $match: { "operationType": { $in: [ "insert", "update", "replace" ] } } }
    ], { fullDocument: 'updateLookup' });

    const homeworkStream = Homework.watch([
        { $match: { "operationType": { $in: [ "insert", "update", "replace" ] } } }
    ], { fullDocument: 'updateLookup' });

    const postStream = Post.watch([
        { $match: { "operationType": { $in: [ "insert", "update", "replace" ] } } }
    ], { fullDocument: 'updateLookup' });
    
    chatStream.on('change', async (change) => {
        if (change.operationType == 'insert' || change.operationType == 'update') {
            const members = change.fullDocument?.members;
            const sockets = await UserSocket.find({ user: { $in: members }});
            const socketIds = sockets.map(socket => socket._id);

            io.to(socketIds).emit('pushNotification', change.fullDocument._id);
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

    groupStream.on('change', async (change) => {
        if (change.operationType === 'insert') {
            const members = change.fullDocument?.members;

            const sockets = await UserSocket.find({ user: { $in: members } });
            const socketIds = sockets.map(socket => socket._id);
            io.to(socketIds).emit('groupNotification', {});
        }
    });

    homeworkStream.on('change', async (change) => {
        if (change.operationType === 'insert') {

        }
    });


    messageObserver.on('change', async (change) => {
        if (change.operationType === 'insert') {
            const chatId = change.fullDocument?.chat.toString();

            io.to(chatId).emit('messageInsert', change.fullDocument);
        }
    });

    
    io.on('connection', async (socket) => {
        console.log(`A new connection in the server ${ socket.id }`);
    
        const userSocket = new UserSocket({
            _id: socket.id,
            user: socket.userId
        });
        await userSocket.save();
    
        await Chat.updateMany({ members: socket.userId }, 
        { 
            $addToSet: {
                activeUsers: socket.userId
            }
        });
    
        //socket.emit('message', 'Welcome to SignalFlags');
        socket.on('join-call', (chatId, userId) => {
            socket.join(chatId);
            socket.to(chatId).emit('user-connected', userId);
        });




        





        socket.on('disconnect', async () => {
            console.log(`User ${ socket.id } disconnect`);

            await UserSocket.deleteOne({ _id: socket.id });

    
            const activeSockets = await UserSocket.find({ user: socket.userId });
            const activeSocketsCount = activeSockets.length;
    
            // Si hay 0 significa que el usuario se desconecto
            if (activeSocketsCount == 0) {
                await Chat.updateMany({ members: socket.userId }, 
                    { 
                        $pull: {
                            activeUsers: socket.userId
                        }
                    });

                const chats = await Chat.find({ members: socket.userId });
                const allMembers = chats.reduce((acc, chat) => {
                    return acc.concat(chat.members);
                  }, []);
    
                const sockets = await UserSocket.find({ user: { $in: allMembers }});
                const socketIds = sockets.map(socket => socket._id);
    
                io.to(socketIds).emit('userDisconnect', {});
            }
        });
    });

}