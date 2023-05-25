import jwt from 'jsonwebtoken';

import User from '../models/user.model.js';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';
import Group from '../models/group.model.js';
import Homework from '../models/homework.model.js';
import Post from '../models/post.model.js';
import UserSocket from '../models/userSocket.model.js';

export default async function(io) {

    await UserSocket.deleteMany({});
    await Post.updateMany({  },
    {
        activeUser: false
    });

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

    const userStream = User.watch([
        { $match: { "operationType": { $in: [ "insert", "update", "replace" ] } } }
    ], { fullDocument: 'updateLookup' })
    
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

    const postObserver = Post.watch([
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

    userStream.on('change', async (change) => {
        if (change.operationType == 'update') {
            const userId = change.fullDocument?._id;

            console.log(userId);

            const sockets = await UserSocket.find({ user: userId});
            const socketIds = sockets.map(socket => socket._id);

            io.to(socketIds).emit('updateUser', change.fullDocument);
        }
    })
    
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

    postObserver.on('change', async (change) => {
        if (change.operationType === 'insert' || change.operationType == 'update') {
            //console.log(change.fullDocument);
            const groupId = change.fullDocument?.group.toString();

            const { members } = await Group.findById(groupId);
            
            const sockets = await UserSocket.find({ user: { $in: members } });
            const socketIds = sockets.map(socket => socket._id);
            io.to(socketIds).emit('postNotification', {});
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

        await Post.updateMany({ user: socket.userId },
        {
            activeUser: true
        });

        socket.on('selectChat', (chatId) => {
            // Unirse a la sala del chat correspondiente
            socket.leaveAll();
            socket.join(socket.id);
            socket.join(chatId);
            //console.log(socket.rooms);
        });

        socket.on('leaveRooms', () => {
            socket.leaveAll();
            socket.join(socket.id);
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

                await Post.updateMany({ user: socket.userId },
                    {
                        activeUser: false
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