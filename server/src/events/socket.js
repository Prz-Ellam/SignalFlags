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

        // Seleccionar un chat
        socket.on('selectChat', (chatId) => {
            // Unirse a la sala del chat correspondiente
            socket.leaveAll();
            socket.join(socket.id);
            socket.join(chatId);
            console.log(socket.rooms);
        });

        socket.on('leaveRooms', () => {
            socket.leaveAll();
            socket.join(socket.id);
        });





        socket.on('prepareOffer', async (data) => {
            let call = await Call.findOne({
                $or: [
                    { offerUser: data.offerUser, answerUser: data.answerUser },
                    { offerUser: data.answerUser, answerUser: data.offerUser }
                ]
            });

            if (!call) {
                call = await Call.create({
                    offerUser: data.offerUser,
                    answerUser: data.answerUser
                });
            }
            
            let type = (data.userId === call.offerUser.toString()) ? 'offer' : 'answer';
            socket.join(call._id);
            socket.emit('createdOffer', { id: call._id, type });
        });

        socket.on('setOffer', async data => {
            const call = await Call.findByIdAndUpdate(data.callId, {
                offer: data.offer
            },
            {
                new: true
            });

            const sockets = await UserSocket.find({ user: call?.answerUser });
            const socketIds = sockets.map(socket => socket._id);
            // Llama al otro usuario
            if (socketIds.length > 0) {
                io.to(socketIds).emit('videocall', {});
            }
        });

        socket.on('setAnswer', async data => {
            const call = await Call.findByIdAndUpdate(data.callId, {
                answer: data.answer
            },
            {
                new: true
            });

            const sockets = await UserSocket.find({ user: call.offerUser });
            const socketIds = sockets.map(socket => socket._id);
            if (socketIds.length > 0) {
                io.to(socketIds).emit('getAnswer', { answer: call.answer });
            }
        });

        socket.on('setOfferCandidate', async data => {
            await Call.findByIdAndUpdate(data.callId, {
                $addToSet: {
                    offerCandidates: data.candidate
                }
            });
        });

        socket.on('setAnswerCandidate', async data => {
            const call = await Call.findByIdAndUpdate(data.callId, {
                $addToSet: {
                    offerCandidates: data.candidate
                }
            },
            {
                new: true
            });
            const sockets = await UserSocket.find({ user: call.offerUser });
            const socketIds = sockets.map(socket => socket._id);
            io.to(socketIds).emit('getAnswerCandidate', data.candidate);
        });

        socket.on('getOffer', async (id) => {
            const call = await Call.findById(id);
            if (!call) return null;
            socket.emit('getOffer', call.offer);
        });

        socket.on('getOfferCandidates', async (id) => {
            const call = await Call.findById(id);
            if (!call) return [];
            socket.emit('getOfferCandidates', call.offerCandidates);
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