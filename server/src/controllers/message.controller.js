import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';

const MessageController = {};

export const messageCreateController = async (req, res) => {
    const { chatId } = req.params;
    const { text } = req.body;
    const authUser = req.user;

    // Buscar si el usuario pertenece al chat
    const requestedChat = await Chat.findOne({ _id: chatId, members: authUser._id });
    if (!requestedChat) {
        return res.status(401).json({
            status: false,
            message: 'No autorizado'
        });
    }
    
    try {
        const message = new Message({
            text,
            sender: authUser._id,
            chat: chatId,
            viewed_by: {
                user: authUser._id
            }
        });
        
        await message.save();
        const unseenMessageCount = await Message.find({ 
            chat: chatId, 'viewed_by.user': { $ne: authUser._id } }).length;
        
        await Chat.findOneAndUpdate({ _id: chatId }, { 
            latestMessage: message._id,
            unseenMessages: unseenMessageCount
        });

        return res.status(201).json({
            status: true,
            message: 'El mensaje se creó éxitosamente'
        });
    }
    catch (ex) {
        return res.status(500).json({
            status: true,
            message: 'Hubo un error en el servidor'
        });
    }
}

export const messagefindAllByChatController = async (req, res) => {
    const { chatId } = req.params;
    const authUser = req.user;

    // Deja en visto los mensajes
    await Message.updateMany({ chat: chatId, 'viewed_by.user': { $ne: authUser._id } }, {
        $push: {
            viewed_by: {
                user: authUser._id
            }
        }
    });

    const messages = await Message.find({ chat: chatId })
        .populate('sender', '-__v -password -active')
        .select('-__v -viewed_by.id -active');
    res.json({
        status: true,
        message: messages
    });
}