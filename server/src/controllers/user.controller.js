import bcrypt from 'bcrypt';
import fs from 'fs';
import User from '../models/user.model.js';
import Chat from '../models/chat.model.js';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateToken } from '../configuration/generate-token.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const userLoginController = async (req, res) => {
    const { email, password } = req.body;

    const requestedUser = await User.findOne({ email });
    if (!requestedUser) {
        return res.status(401).json({
            status: false,
            message: 'Credenciales incorrectas'
        });
    }

    const checkPassword = await bcrypt.compare(password, requestedUser.password);
    if (!checkPassword) {
        return res.status(401).json({
            status: false,
            message: 'Credenciales incorrectas'
        });
    }

    const token = generateToken(requestedUser._id);
    return res.json({
        status: true,
        message: 'El usuario se autentico éxitosamente',
        user: { 
            _id: requestedUser._id, 
            username: requestedUser.username,
            email: requestedUser.email,
            avatar: requestedUser.avatar
        },
        token: token
    });
}

const userCreateController = async (req, res) => {
    const { avatar, email, username, password } = req.body;

    // Validar que nadie mas tenga el nombre de usuario
    const existingUsernameUser = await User.findOne({ username });
    if (existingUsernameUser) {
        return res.status(409).json({
            status: false,
            message: 'El nombre de usuario esta siendo utilizado por alguien más'
        });
    }
    
    // Validar que nadie mas tenga el correo electróncio
    const existingEmailUser = await User.findOne({ email });
    if (existingEmailUser) {
        return res.status(409).json({
            status: false,
            message: 'El correo electrónico esta siendo utilizado por alguien más'
        });
    }
    
    // Validar que la imagen que paso realmente exista
    // TODO: Esta hardcodeada la direccion de uploads, parametrizarla en caso de cambios
    const uploadsDir = path.join(__dirname, '../../../uploads/');
    const existingAvatar = fs.existsSync(path.join(uploadsDir, avatar));
    if (!existingAvatar) {
        return res.status(404).json({
            status: false,
            message: 'No se encontró la foto de perfil especificada'
        });
    }

    const existingAvatarUser = await User.findOne({ avatar });
    if (existingAvatarUser) {
        return res.status(409).json({
            status: false,
            message: 'La foto de perfil no es valida'
        });
    }

    // TODO: Validar que sea una foto

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        avatar,
        email,
        username,
        password: hashedPassword
    });

    try {
        await user.save();
    }
    catch (ex) {
        return res.status(500).json({
            status: false,
            message: 'Hubo un error en el servidor'
        });
    }

    res.status(201).json({
        status: true,
        message: 'El usuario fue creado con éxito',
        token: generateToken(user._id)
    });
};

const userUpdateController = async (req, res) => {
    const id = req.params.id;
    const { email, username } = req.body;

    const user = await User.findById(id);
    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'El usuario no existe'
        });
    }

    const existingUsernameUser = await User.findOne({ username, _id: { $ne: id } });
    if (existingUsernameUser) {
        return res.status(409).json({
            status: false,
            message: 'El nombre de usuario esta siendo utilizado por alguien más'
        });
    }

    // Validar que el email no lo tenga nadie mas
    const existingEmailUser = await User.findOne({ email, _id: { $ne: id } });
    if (existingEmailUser) {
        return res.status(409).json({
            status: false,
            message: 'El correo electrónico esta siendo utilizado por alguien más'
        });
    }

    try {
        user.username = username;
        user.email = email;
        await user.save();
    }
    catch (ex) {
        return res.status(500).json({
            status: false,
            message: 'Hubo un error en el servidor'
        });
    }

    return res.json({
        status: true,
        message: 'El usuario fue actualizado con éxito'
    });
};

// userFindOneController
const findOneUserController = async (req, res) => {
    const id = req.params.id;
    const user = await User.findOne({ _id: id }, { __v: 0, groups: 0, password: 0 });
    return res.json({
        status: true,
        message: user
    });
};

// userFindAllController
const findAllUsersController = async (req, res) => {
    const users = await User.find({}, { __v: 0, groups: 0, password: 0 });
    return res.json({
        status: true,
        message: users
    });
}

export const userFindAllNotChatController = async (req, res) => {
    const authUser = req.user; 
    
    const chats = await Chat.find({
        type: 'individual',
        members: authUser._id
    });

    const usersInChats = await Chat.distinct('members', {
        type: 'individual',
        _id: { $in: chats.map((chat) => chat._id) }
      });

    const usersWithoutChat = await User.find({
        _id: { $ne: authUser._id },
        _id: { $nin: usersInChats }
    })
        .select('-password -__v');
      

    return res.json({
        status: true,
        message: usersWithoutChat
    });
}

export default {
    userLoginController,
    userCreateController,
    userUpdateController,
    findOneUserController,
    findAllUsersController
};