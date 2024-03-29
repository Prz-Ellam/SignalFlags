import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import Chat from '../models/chat.model.js';
import Group from '../models/group.model.js';

import UserService from '../services/user.service.js';

import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { generateToken } from '../configuration/generate-token.js';
import UserSocket from '../models/userSocket.model.js';
import io from '../index.js';

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
            avatar: requestedUser.avatar,
            score: requestedUser.score
        },
        token: token
    });
}

const userLogoutController = async (req, res) => {
    const authUser = req.user;
    try {
        const sockets = await UserSocket.find({ user: authUser._id });
    
        //console.log(io.sockets.sockets);
        sockets.forEach(function(socket) {
            var nsocket = io.sockets.sockets.get(socket._id.toString());
            //console.log(socket._id.toString());
            if (nsocket) {
                console.log(`Desconectar ${socket._id}`);
                nsocket.disconnect();
            }
        });

        res.json({});
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

export const userCreateController = async (req, res) => {
    const { avatar, email, username, password } = req.body;

    const isUsernameTaken = await UserService.isUsernameTaken(username);
    if (isUsernameTaken) {
        return res.status(409).json({
            status: false,
            message: 'El nombre de usuario está siendo utilizado por alguien más'
        });
    }
    
    const isEmailTaken = await UserService.isEmailTaken(email);
    if (isEmailTaken) {
        return res.status(409).json({
            status: false,
            message: 'El correo electrónico esta siendo utilizado por alguien más'
        });
    }
    
    try {
        const user = await UserService.create(avatar, email, username, password);
        return res.status(201).json({
            status: true,
            message: 'El usuario fue creado con éxito',
            user: { 
                _id: user._id, 
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                score: user.score
            },
            token: generateToken(user._id)
        });
    }
    catch (ex) {
        return res.status(500).json({
            status: false,
            message: 'Hubo un error en el servidor'
        });
    }
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

    const isUsernameTaken = await UserService.isUsernameTakenExcludingUser(username, id);
    if (isUsernameTaken) {
        return res.status(409).json({
            status: false,
            message: 'El nombre de usuario esta siendo utilizado por alguien más'
        });
    }

    const isEmailTaken = await UserService.isEmailTakenExcludingUser(email, id);
    if (isEmailTaken) {
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

export const userGetAllExceptMeController = async (req, res) => {
    const authUser = req.user;
    const users = await User.find({ _id: { $ne: authUser._id } }, { __v: 0, groups: 0, password: 0 });
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
    login: userLoginController,
    logout: userLogoutController,
    create: userCreateController,
    update: userUpdateController,
    findOne: findOneUserController,
    findAllNotChat: userFindAllNotChatController,
    findAllUsersController,
};