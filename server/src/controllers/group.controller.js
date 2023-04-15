import User from '../models/user.model.js';
import Group from '../models/group.model.js';
import Post from '../models/post.model.js';
import Homework from '../models/homework.model.js';
import GroupService from '../services/group.service.js';

const groupCreateController = async (req, res) => {
    // 200 - OK
    // 401 - Unauthorized
    
    const user = req.user;
    const { name, description, privacy, avatar } = req.body;

    const group = new Group({
        name,
        description,
        privacy,
        avatar,
        members: [ user._id ],
        admins: [ user._id ]
    });

    await group.save();

    res.status(201).json(group);
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

    const { members } = await Group.findById(id)
        .select('members')
        .populate('members', '-password');

    res.json(members);
}

const groupFindHomeworks = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    const homeworks = await Homework.find({ group: id });

    // const { homeworks } = await Group.findById(id)
    //     .select('homeworks')
    //     .populate('homeworks');

    res.json(homeworks);
}

const groupFindSubgroups = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    // const { subgroups } = await Group.findById(id)
    //     .select('subgroups')
    //     .populate('subgroups');

    res.json(subgroups);
}

const groupFindPosts = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;

    const posts = await Post.find({ group: id });

    res.json(posts);
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
    addUserToGroupController
};