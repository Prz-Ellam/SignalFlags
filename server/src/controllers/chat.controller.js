import Chat from '../models/chat.model.js';
import User from '../models/user.model.js';

export const createChatController = async (req, res) => {

    const chat = new Chat();

    chat.save();

    res.status(201).json({
        status: true,
        message: 'El chat se creó éxitosamente'
    });
}

export const addUserToChatController = async (req, res) => {
    const { userId, chatId } = req.params; 

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

    if (requestedChat.participants.includes(userId)) {
        return res.status(409).json({
            status: false,
            message: 'El usuario ya se encuentra en el chat'
        });
    }

    requestedChat.participants.push(userId);
    requestedChat.save();

    return res.json('Ya quedo');
}

const deleteChatController = async (req, res) => {

}

export const findUserChatsController = async (req, res) => {
    const id = req.params.id;
    const chats = await Chat.find({ participants: id });
    return res.json(chats);
}