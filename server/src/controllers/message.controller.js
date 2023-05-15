import crypto from 'crypto';
import Chat from '../models/chat.model.js';
import Message from '../models/message.model.js';

const MessageController = {};

export const messageCreateController = async (req, res) => {
    const { chatId } = req.params;
    let { text } = req.body;
    const authUser = req.user;
    const files = req.files ?? [];

    console.log(files);

    // Buscar si el usuario pertenece al chat
    const requestedChat = await Chat.findOne({ _id: chatId, members: authUser._id });
    if (!requestedChat) {
        return res.status(401).json({
            status: false,
            message: 'No autorizado'
        });
    }
    
    try {
        const filesuris = files.map(file => ({ 
            name: file.originalname,
            url: `/uploads/${ file.filename }`,
            type: file.mimetype
        }));

        if (requestedChat.encrypted) {
            const algorithm = 'aes-192-cbc'; //algorithm to use
            const secret = 'your-secret-key';
            const key = crypto.scryptSync(secret, 'salt', 24); //create key

            const iv = Buffer.from('1234567890123456');
            const cipher = crypto.createCipheriv(algorithm, key, iv);
            const encrypted = cipher.update(text, 'utf8', 'hex') + cipher.final('hex'); // encrypted text
            text = encrypted;
        }

        const message = new Message({
            text,
            attachments: filesuris,
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

    console.log(messages);
    const algorithm = "aes-192-cbc"; //algorithm to use
    const secret = 'your-secret-key';
    const key = crypto.scryptSync(secret, 'salt', 24);
    messages.forEach(message => {
        try {
            const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from('1234567890123456'));
            var decrypted = decipher.update(message.text, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
            message.text = decrypted;
        }
        catch(exception) {

        }
    });

    res.json({
        status: true,
        message: messages
    });
}