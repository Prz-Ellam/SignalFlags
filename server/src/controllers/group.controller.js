import User from '../models/user.model.js';
import Group from '../models/group.model.js';
import Post from '../models/post.model.js';
import Homework from '../models/homework.model.js';
import GroupService from '../services/group.service.js';
import nodemailer from 'nodemailer';

import { Types } from 'mongoose';

import { multerUpload } from '../configuration/multer.js';

const groupCreateController = async (req, res) => {
    const user = req.user;
    const { name, description, privacy, userIds } = req.body;

    for (const userId of userIds) {
        const existingUser = User.findById(userId);
        if (!existingUser) {
            return res.status(404).json({
                status: false,
                message: `Usuario con id ${ userId } no encontrado`
            });
        }
    }

    if (!userIds.includes(user._id)) {
        userIds.push(user._id);
    }

    const group = new Group({
        name,
        description,
        privacy,
        avatar: '/src/assets/images/POI_SignalFalgs.png',
        members: userIds,
        admins: [ user._id ]
    });

    await group.save();

    res.status(201).json(group);
}

const groupAddAvatarController = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;
    const file = req.file;

    try {
        const group = await Group.findById(id);
        if (!group) {
            //multerUpload.multerAbort();
            return res.status(404).json({
                status: false,
                message: 'Grupo no encontrado'
            });
        }

        const isAuthUserAdmin = group.admins.includes(authUser._id);
        if (!isAuthUserAdmin) {
            //multerUpload.multerAbort();
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        }

        if (!file) {
            //multerUpload.multerAbort();
            return res.status(400).json({
                status: false,
                message: 'No admitido'
            });
        }

        const allowedExtensions = [ 'image/jpeg', 'image/jpg', 'image/png' ];
        if (!allowedExtensions.includes(file.mimetype)) {
            //multerUpload.multerAbort();
            return res.status(400).json({
                status: false,
                message: 'No admitido'
            });
        }

        if (file.size > 8 * 1024 * 1024) {
            //multerUpload.multerAbort();
            return res.status(400).json({
                status: false,
                message: 'No admitido'
            });
        }

        group.avatar = `/uploads/${ file.filename }`;
        await group.save();

        res.json({
            message: 'si'
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const groupUpdateController = async (req, res) => {
    const { id } = req.params;
    const { name, description, avatar } = req.body;
    const authUser = req.user;

    const isGroupExisting = await GroupService.exists(id);
    if (!isGroupExisting) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrado'
        });
    }

    const isAuthUserAdmin = await Group.find({ id, admins: authUser._id });
    if (!isAuthUserAdmin) {
        return res.status(403).json({
            status: false,
            message: 'Permiso denegado'
        });
    }

    const group = await Group.findByIdAndUpdate(id, {
        name,
        description,
        avatar
    },
    {
        new: true
    });

    res.json(group);
};

const groupDeleteController = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    const isGroupExisting = await GroupService.exists(id);
    if (!isGroupExisting) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrado'
        });
    }

    const isAuthUserAdmin = await Group.find({ id, admins: authUser._id });
    if (!isAuthUserAdmin) {
        return res.status(403).json({
            status: false,
            message: 'Permiso denegado'
        });
    }

    res.json({
        message: 'El grupo ha sido eliminado'
    });
}

const groupCreateSubgroupController = async (req, res) => {
    const { id } = req.params;
    const { name, description, userIds } = req.body;
    const user = req.user;
    try {
        const requestedGroup = await Group.findById(id);
        if (!requestedGroup) {
            return res.status(404).json({
                status: false,
                message: 'Grupo no encontrado'
            });
        }

        if (requestedGroup.parent) {
            return res.status(400).json({
                status: false,
                message: 'Los subgrupos no pueden tener otros subgrupos'
            });
        }

        for (const userId of userIds) {
            const existingUser = User.findById(userId);
            if (!existingUser) {
                return res.status(404).json({
                    status: false,
                    message: `Usuario con id ${ userId } no encontrado`
                });
            }

            const isUserInGroup = await Group.findOne({ _id: id, members: userId });
            if (!isUserInGroup) {
                return res.status(404).json({
                    status: false,
                    message: `Usuario con id ${ userId } no pertenece al grupo`
                });
            }
        }

        // Solo un admin puede crear un subgrupo
    
        if (!userIds.includes(user._id)) {
            userIds.push(user._id);
        }
    
        const group = new Group({
            name,
            description,
            parent: requestedGroup._id,
            privacy: 'private',
            members: userIds,
            admins: [ user._id ]
        });
    
        await group.save();
    
        res.status(201).json(group);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: exception
        });
    }
}

const groupAddMemberController = async (req, res) => {
    const authUser = req.user;
    const { groupId } = req.params;
    const { userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({
                status: false,
                message: 'El grupo no fue encontrado'
            });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                status: false,
                message: 'El usuario no fue encontrado'
            });
        }

        const isAuthUserAdmin = group.admins.includes(authUser._id);
        if (!isAuthUserAdmin) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        }

        const isUserAdded = group.members.includes(userId);
        if (isUserAdded) {
            return res.status(400).json({
                status: false,
                message: 'El usuario ya se encuentra en el grupo'
            });
        }

        group.members.push(userId);
        await group.save();
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const addUserToGroupController = async (req, res) => {
   
};

const groupFindOneController = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    const group = await Group.findById(id);
    if (!group) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrado'
        });
    }

    // Si es privado y no perteneces al grupo
    if (group.privacy === 'private' && !group.members.includes(authUser._id)) {
        return res.status(403).json({
            status: false,
            message: 'Permiso denegado'
        });
    }

    res.json(group);
}

const groupFindMembers = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    const groupFound = await Group.findById(id);
    if (!groupFound) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrado'
        });
    }

    if (groupFound.privacy === 'private' && !groupFound.members.includes(authUser._id)) {
        return res.status(403).json({
            status: false,
            message: 'Permiso denegado'
        });
    }

    const { members } = await Group.findById(id)
        .select('members')
        .populate('members', '-password');

    res.json(members);
}

const groupFindHomeworks = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    const groupFound = await Group.findById(id);
    if (!groupFound) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrado'
        });
    }

    const isAuthUserMember = groupFound.members.includes(authUser._id);
    if (!isAuthUserMember) {
        return res.status(403).json({
            status: false,
            message: 'Permiso denegado'
        });
    }

    const homeworks = await Homework.find({ group: id })
        .populate('group', 'name avatar')
        .select('-delivers');

    res.json(homeworks);
}

const groupFindSubgroups = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    const groupFound = await Group.findById(id);
    if (!groupFound) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrado'
        });
    }

    const isAuthUserMember = groupFound.members.includes(authUser._id);
    if (!isAuthUserMember) {
        return res.status(403).json({
            status: false,
            message: 'Permiso denegado'
        });
    }

    const subgroups = await Group.find({ parent: id, members: authUser._id });

    res.json(subgroups);
}

const groupFindPosts = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    const groupFound = await Group.findById(id);
    if (!groupFound) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrado'
        });
    }

    const isAuthUserMember = groupFound.members.includes(authUser._id);
    if (!isAuthUserMember) {
        return res.status(403).json({
            status: false,
            message: 'Permiso denegado'
        });
    }

    const posts = await Post.find({ group: id })
        .populate('user', '-password')
        .select('-group');

    return res.json(posts);
}

const groupEmail = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'poisignalflags@gmail.com',
                pass: '987Zyx$$'
            }
        });

        const destinatario = 'PerezAlex088@outlook.com';
        const mensaje = {
            to: destinatario,
            subject: '¡Bienvenido a mi aplicación!',
            text: `Hola, bienvenido a mi aplicación. Espero que disfrutes usándola.`
        };

        transporter.sendMail(mensaje)
            .then(() => console.log(`Correo electrónico enviado a ${destinatario}`))
            .catch((error) => console.error(error));

        res.json({});
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: exception
        });
    }
}

const userFindGroups = async (req, res) => {
    const { id } = req.params;

    const requestedUser = await User.findById(id);
    if (!requestedUser) {
        return res.status(404).json({
            status: false,
            message: 'Usuario no encontrado'
        });
    }

    const groups = await Group.find({ members: { $in: id }, parent: null })
        .select('-members -admins -subgroups -homeworks -posts');

    res.json(groups);
}

export default {
    create: groupCreateController,
    update: groupUpdateController,
    delete: groupDeleteController,
    findOne: groupFindOneController,
    findMembers: groupFindMembers,
    findHomeworks: groupFindHomeworks,
    findSubgroups: groupFindSubgroups,
    findPosts: groupFindPosts,
    findByUser: userFindGroups,
    addAvatar: groupAddAvatarController,
    addUserToGroupController,
    createSubgroup: groupCreateSubgroupController,
    email: groupEmail
};