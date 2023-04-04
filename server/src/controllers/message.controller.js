import Chat from '../models/chat.model';
import Message from '../models/message.model';
import jwt from 'jsonwebtoken';

export const messageCreateController = async (req, res) => {
    const { chatId } = req.params;
    const { content } = req.body;

    const decode = jwt.verify(token, 'Jeff');
    const userId = decode.id;

    // Buscar si el usuario pertenece al chat
    const requestedChat = await Chat.find({ _id: chatId, participants: userId });
    if (!requestedChat) {
        return res.status(401).json({
            status: false,
            message: 'No autorizado'
        });
    }

    const message = new Message({
        content,
        user: id,
        chat: chatId
    });

    try {
        message.save();
    }
    catch (ex) {
        return res.status(500).json({
            status: true,
            message: 'Hubo un error interno'
        });
    }

    return res.status(201).json({
        status: true,
        message: 'El mensaje se creó éxitosamente'
    });
}