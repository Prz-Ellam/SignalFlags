import crypto from 'crypto';
import { Types } from 'mongoose';
import User from '../models/user.model.js';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';
import UserSocket from '../models/userSocket.model.js';
import { format } from 'date-fns';

const ChatController = {};

export const chatAccessController = async (req, res) => {
    const { userId } = req.body;
    const authUser = req.user;

    if (userId === authUser._id.toString()) {
        return res.status(400).json({
            status: false,
            message: 'Chat no valido'
        });
    }

    const requestedChat = await Chat.find({
        type: 'individual',
        $and: [
            { members: { $elemMatch: { $eq: authUser._id } } },
            { members: { $elemMatch: { $eq: userId } } }
        ]
    })
        .populate('members', '-password -__v')
        .select('-__v -groupAdmin -type');

    if (requestedChat.length > 0) {
        return res.json(requestedChat[0]);
    }

    try {
        // Primero creamos el chat y lo guardamos
        const chat = new Chat({
            type: 'individual',
            members: [ userId, authUser._id ],
            activeUsers: [ authUser._id ]
        });

        await chat.save();

        // Verificamos si el usuario esta actualmente conectado
        const existingSocket = await UserSocket.find({ user: userId });
        if (existingSocket.length > 0) {
            chat.activeUsers.push(userId);
            await chat.save();
        }

        const populateChat = await Chat.findById(chat._id)
            .populate('members', '-password -__v')
            .select('-__v -groupAdmin -type');

        return res.json({
            status: true,
            message: populateChat
        });
    }
    catch (ex) {
        return res.status(500).json({
            status: false,
            message: 'Hubo un error en el servidor'
        });
    }
}

// chatCreateGroupController
export const chatCreateController = async (req, res) => {
    const authUser = req.user;
    const { name, avatar, members } = req.body;

    // TODO: Cuando se cree el chat validar si los usuarios involucrados estan conectados

    // Validar que el propio authUser no este ya en la lista de miembros
    // Validar que la lista contenga miembros que si existen
    for (const member of members) {
        if (!Types.ObjectId.isValid(member)) {
            return res.status(400).json({
                status: true,
                message: 'Uno de los miembros no es válido'
            });
        }
        if (member == authUser._id) {
            return res.status(400).json({
                status: true,
                message: 'No se puede añadir a si mismo en la lista'
            });
        }
    }

    try {
        members.push(authUser._id);

        const groupChat = new Chat({
            avatar,
            name,
            type: 'group',
            members: members,
            groupAdmin: authUser._id
        });

        await groupChat.save();

        const message = new Message({
            text: 'Se creó el grupo',
            sender: null,
            chat: groupChat._id,
            viewed_by: {
                user: authUser._id
            }
        });

        await message.save();

        const unseenMessageCount = await Message.find({ 
            chat: groupChat._id, 'viewed_by.user': { $ne: authUser._id } }).length;

        await Chat.findOneAndUpdate({ _id: groupChat._id }, { 
            latestMessage: message._id,
            unseenMessages: unseenMessageCount
        });

        res.status(201).json({
            status: true,
            message: 'El chat se creó éxitosamente'
        });
    }
    catch (ex) {
        return res.status(500).json({
            status: false,
            message: 'No se pudo crear el chat'
        });
    }
}

// Solo se pueden actualizar los chats que son grupales
export const chatUpdateController = async (req, res) => {
    // /api/v1/chats/:id
    const { id } = req.params;
    const { avatar, name } = req.body;

    // Validar que el chat exista realmente
    const requestedChat = await Chat.findById(id);
    if (!requestedChat) {
        return res.status(404).json({
            status: false,
            message: 'El chat solicitado no existe'
        });
    }

    if (requestedChat.type !== 'group') {
        return res.status(401).json({
            status: false,
            message: 'El chat solicitado no se puede actualizar'
        });
    }

    try {
        requestedChat.avatar = avatar;
        requestedChat.name = name;
        await requestedChat.save();

        return res.status(200).json({
            status: true,
            message: 'El chat se actualizó éxitosamente'
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error interno'
        });
    }
}

export const addUserToChatController = async (req, res) => {
    const { userId, chatId } = req.params;

    // Validar que el chat no sea individual

    // Validar que el usuario exista
    const requestedUser = await User.findById(userId);
    if (!requestedUser) {
        return res.status(400).json({
            status: false,
            message: 'El usuario no existe'
        });
    }

    // Validar que el chat exista
    const requestedChat = await Chat.findById(chatId);
    if (!requestedChat) {
        return res.status(400).json({
            status: false,
            message: 'El chat no existe'
        });
    }

    if (requestedChat.members.includes(userId)) {
        return res.status(409).json({
            status: false,
            message: 'El usuario ya se encuentra en el chat'
        });
    }

    requestedChat.members.push(userId);
    requestedChat.save();

    return res.json('Ya quedo');
}

export const deleteUserToChatController = async (req, res) => {
    const { userId, chatId } = req.params;

    // Validar que el chat no sea individual

    // TODO
}

const deleteChatController = async (req, res) => {

}

export const findUserChatsController = async (req, res) => {
    const { id } = req.params;

    const chats = await Chat.find({ members: id })
        .populate('members', '-password -__v -active')
        .populate({
            path: 'latestMessage',
            select: '-chat -__v -active',
            populate: { path: 'sender', select: '-password -__v' }
        })
        .select('-__v -groupAdmin -active');

    const sortedChats = chats.sort((a, b) => {
        if (!a.latestMessage && !b.latestMessage) {
            return 0;
        } else if (!a.latestMessage) {
            return -1;
        } else if (!b.latestMessage) {
            return 1;
        } else {
            const aLatestMessageDate = new Date(a.latestMessage.createdAt);
            const bLatestMessageDate = new Date(b.latestMessage.createdAt);
            return bLatestMessageDate - aLatestMessageDate;
        }
    });
    
    const chatList = await Promise.all(sortedChats.map(async chat => {
        const _id = chat.id;
        const userId = chat.members.filter(member => member._id.toString() !== id).map(member => member._id)[0];
        const name = chat.name || chat.members.filter(member => member._id.toString() !== id).map(member => member.username).join(', ');
        const avatar = chat.avatar || chat.members.filter(member => member._id.toString() !== id)[0]?.avatar;
        const encrypted = chat.encrypted;
        let lastMessage = chat.latestMessage ? chat.latestMessage : { text: '', sender: {username: ''} };
        
        if (chat.encrypted) {
            try {
                const algorithm = 'aes-192-cbc'; //algorithm to use
                const secret = 'your-secret-key';
                const key = crypto.scryptSync(secret, 'salt', 24);
                const iv = Buffer.from('1234567890123456');

                const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from('1234567890123456'));
                var decrypted = decipher.update(lastMessage.text, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
                lastMessage.text = decrypted;
            }
            catch(e){}
        }

        // Cosas de la zona horaria
        const lastMessageTime = chat.latestMessage ? format(new Date(new Date(chat.latestMessage.createdAt).getTime() - (3600 * 1000)), 'dd/MM/yy HH:mm') : '';
        
        const activeUser = chat.activeUsers.filter(activeUser => activeUser.toString() !== id);
        //console.log(chat.activeUsers);
        const active = activeUser.length > 0 ? true : false;

        let unseenMessagesCount = 0;

        if (chat.latestMessage) {
            const viewedByUser = chat.latestMessage.viewed_by.find(view => view.user.toString() === id);

            if (viewedByUser && viewedByUser.viewed_at >= lastMessageTime) {
                unseenMessagesCount = 0;
            } else {
                // Obtener todos los mensajes no vistos del chat
                const unseenMessages = await Message.find({ chat: chat._id, 'viewed_by.user': { $ne: id } });
                unseenMessagesCount = unseenMessages.length;
            }
        }

        return {
            _id,
            name,
            avatar,
            userId,
            type: chat.type,
            lastMessage,
            lastMessageTime,
            unseenMessagesCount,
            active,
            encrypted
        };
    }));

    return res.json({
        status: true,
        message: chatList
    });
}

export const chatDesencrypt = async (req, res) => {
    const { id } = req.params;

    const chat = await Chat.findById(id);
    chat.encrypted = false;
    chat.save();

    const messages = await Message.find({ chat: id });

    const algorithm = 'aes-192-cbc';
    const secret = 'your-secret-key';
    const key = crypto.scryptSync(secret, 'salt', 24);
    messages.forEach(message => {
        try {
            const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from('1234567890123456'));
            var decrypted = decipher.update(message.text, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
            message.text = decrypted;
            message.save();
        }
        catch(exception) {

        }
    });

    res.json({});
}

export const chatEncrypt = async (req, res) => {
    const { id } = req.params;

    const chat = await Chat.findById(id);
    chat.encrypted = true;
    chat.save();

    const messages = await Message.find({ chat: id });

    const algorithm = 'aes-192-cbc';
    const secret = 'your-secret-key';
    const key = crypto.scryptSync(secret, 'salt', 24);
    messages.forEach(message => {
        try {
            const iv = Buffer.from('1234567890123456');
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            const encrypted = cipher.update(message.text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
            message.text = encrypted;
            message.save();
        }
        catch(exception) {

        }
    });

    res.json({});
}

export const chatFindUsersController = async (req, res) => {
    const { id } = req.params;
    try {
        const selectedChat = await Chat.findById(id);
        if (!selectedChat) {
            return res.status(404).json({
                status: false,
                message: 'Chat no encontrado'
            });
        }

        const { members } = await Chat.findById(id)
            .populate('members', '-password -__v');

        res.json(members);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}