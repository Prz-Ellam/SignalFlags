import { Types } from 'mongoose';
import User from '../models/user.model.js';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';
import { format } from 'date-fns';

export const chatAccessController = async (req, res) => {
    const { userId } = req.body;
    const authUser = req.user;

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
        const chat = new Chat({
            type: 'individual',
            members: [userId, authUser._id]
        });

        await chat.save();
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
    const { members } = req.body;

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
            type: 'group',
            members: members,
            groupAdmin: authUser._id
        });

        await groupChat.save();

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
        .populate('members', '-password -__v')
        .populate({
        path: 'latestMessage',
        select: '-chat -__v',
        populate: { path: 'sender', select: '-password -__v' }
        })
        .select('-__v -groupAdmin');

    const sortedChats = chats.sort((a, b) => {
        const aLatestMessageDate = a.latestMessage ? new Date(a.latestMessage.createdAt) : new Date(0);
        const bLatestMessageDate = b.latestMessage ? new Date(b.latestMessage.createdAt) : new Date(0);
        return bLatestMessageDate - aLatestMessageDate;
    });
    
    const chatList = await Promise.all(sortedChats.map(async chat => {
        const _id = chat.id;
        const name = chat.name || chat.members.filter(member => member._id.toString() !== id).map(member => member.username).join(', ');
        const avatar = chat.avatar || chat.members.filter(member => member._id.toString() !== id)[0].avatar;
        const lastMessage = chat.latestMessage ? chat.latestMessage : {};
        const lastMessageTime = chat.latestMessage ? format(new Date(chat.latestMessage.createdAt), 'dd/MM/yy HH:mm'): '';
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
            lastMessage,
            lastMessageTime,
            unseenMessagesCount
        };
    }));

    return res.json({
        status: true,
        message: chatList
    });
}