import Homework from '../models/homework.model.js';
import Group from '../models/group.model.js';
import User from '../models/user.model.js';

import { Types } from 'mongoose';

const createHomeworkController = async (req, res) => {
    const { groupId } = req.params;
    const { name, description, dueDate } = req.body;
    const authUser = req.user;

    try {
        const requestedGroup = await Group.findById(groupId);
        if (!requestedGroup) {
            return res.status(404).json({
                status: false,
                message: 'El grupo no existe'
            });
        }

        const isAuthUserAdmin = requestedGroup.admins.includes(authUser._id);
        const isAuthUserMember = requestedGroup.members.includes(authUser._id);
        if (!isAuthUserAdmin || !isAuthUserMember) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        }

        const homework = new Homework({
            name,
            description,
            dueDate,
            group: groupId
        });
        await homework.save();

        return res.status(201).json({
            status: true,
            message: 'La tarea fue creada',
            assignmentId: homework._id
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Hubo un error en el servidor'
        });
    }
}

// Dead
const updateHomeworkController = async (req, res) => {
    const { homeworkId } = req.params;
    const { name, description, dueDate } = req.body;
    const authUser = req.user;

    // Validar grupo
    const homework = await Homework.findById(homeworkId);
    if (!homework) {
        return res.status(404).json({
            status: false,
            message: 'Tarea no encontrada'
        });
    }

    const group = await Group.findById(homework.group);
    if (!group) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrado'
        });
    }

    if (group.admins.includes(authUser._id)) {
        return res.status(403).json({
            status: false,
            message: 'Permiso denegado'
        });
    }

    try {
        homework.name = name;
        homework.description = description;
        homework.dueDate = dueDate;
        await homework.save();

        return res.status(201).json({
            status: true,
            message: 'La tarea fue actualizada éxitosamente'
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Hubo un error en el servidor'
        });
    }
};

// Dead
const deleteHomeworkController = async (req, res) => {
    const { homeworkId } = req.params;

    try {
        const homework = await Homework.findById(homeworkId);
        if (!homework) {
            return res.status(404).json({
                status: false,
                message: 'La tarea no existe'
            });
        }

        await homework.delete();

        return res.json({
            status: true,
            message: 'La tarea ha sido eliminada éxitosamente'
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'No se pudo eliminar la tarea'
        });
    }
};

const homeworkFindOne = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;
    try {
        const homework = await Homework.findById(id);
        if (!homework) {
            return res.status(404).json({
                status: false,
                message: 'La tarea no fue encontrada'
            });
        }

        const group = await Group.findById(homework.group);
        if (!group) {
            return res.status(404).json({
                status: false,
                message: 'El grupo no fue encontrado'
            });
        }

        const isAuthUserMember = group.members.includes(authUser._id);
        if (!isAuthUserMember) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        }

        const modifiedHomework = homework.toObject();

        const deliver = homework.delivers.find(
            deliver => deliver.user.toString() === authUser._id.toString()) ?? null;
        modifiedHomework.delivers = deliver;
        
        res.json(modifiedHomework);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const homeworkFindByUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const requestedUser = await User.findById(id);
        if (!requestedUser) {
            return res.status(404).json({
                status: false,
                message: 'Usuario no encontrado'
            });
        }

        const userGroups = await Group.find({ members: id });
        const userGroupsIds = userGroups.map(group => group._id);

        const homeworks = await Homework.aggregate([
            { 
                $unwind: '$delivers' 
            },
            { 
                $match: { 
                    group: { $in: userGroupsIds },
                    'delivers.user': Types.ObjectId(id),
                    $expr: { $lt: [ '$delivers.date', '$dueDate' ] } 
                } 
            },
            {
                $lookup: {
                    from: 'groups',
                    localField: 'group',
                    foreignField: '_id',
                    as: 'group' 
                }
            },
            {
                $addFields: {
                    'group': { $arrayElemAt: ['$group', 0] }
                }
            },
            {
                $project: {
                    delivers: 0,
                    'group.members': 0,
                    'group.admins': 0,
                    'group.subgroups': 0,
                    'group.homeworks': 0,
                    'group.posts': 0
                }
            }
        ]);
        
        return res.json(homeworks);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const homeworkPendingFindByUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const requestedUser = await User.findById(id);
        if (!requestedUser) {
            return res.status(404).json({
                status: false,
                message: 'Usuario no encontrado'
            });
        }

        const userGroups = await Group.find({ members: id });
        const userGroupsIds = userGroups.map(group => group._id);

        // Tareas pendientes
        const currentDate = new Date();
        const homeworks = await Homework.find({
            group: { $in: userGroupsIds },
            dueDate: { $gt: currentDate },
            'delivers.user': { $ne: id }
        })
            .populate('group', '-members -admins -subgroups -homeworks -posts')
            .select('-delivers');
        
        return res.json(homeworks);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const homeworkExpiredFindByUserController = async (req, res) => {
    const { id } = req.params;
    try {
        const requestedUser = await User.findById(id);
        if (!requestedUser) {
            return res.status(404).json({
                status: false,
                message: 'Usuario no encontrado'
            });
        }

        const userGroups = await Group.find({ members: id });
        const userGroupsIds = userGroups.map(group => group._id);
        //const homeworks = await Homework.find({ 'group': { $in: userGroupsIds } });
        
        // Tareas vencidas
        const currentDate = new Date();
        const homeworks = await Homework.find({
            group: { $in: userGroupsIds },
            dueDate: { $lt: currentDate },
            'delivers.user': { $ne: id }
        })
            .populate('group', '-members -admins -subgroups -homeworks -posts')
            .select('-delivers');

        return res.json(homeworks);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const homeworkFindByGroupController = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;
    try {
        const requestedGroup = await Group.findById(id);
        if (!requestedGroup) {
            return res.status(404).json({
                status: false,
                message: 'El grupo no fue encontrado'
            });
        }

        const isAuthUserMember = requestedGroup.members.includes(authUser._id);
        if (!isAuthUserMember) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        } 

        const homeworks = await Homework.find({ 
            group: id, 
            delivers: { $elemMatch: { user: authUser._id } },
            //$expr: { $lt: [ '$delivers.date', '$dueDate' ] }
        })
            .populate('group', '-members -admins -subgroups -homeworks -posts')
            .select('-delivers');

        return res.json({
            status: true,
            message: homeworks
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const homeworkPendingFindByGroupController = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;
    try {
        const requestedGroup = await Group.findById(id);
        if (!requestedGroup) {
            return res.status(404).json({
                status: false,
                message: 'El grupo no fue encontrado'
            });
        }

        const isAuthUserMember = requestedGroup.members.includes(authUser._id);
        if (!isAuthUserMember) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        } 

        const currentDate = new Date();
        const homeworks = await Homework.find({ 
            group: id, 
            dueDate: { $gt: currentDate },
            'delivers.user': { $ne: authUser._id }
            //$expr: { $lt: [ '$delivers.date', '$dueDate' ] }
        })
            .populate('group', '-members -admins -subgroups -homeworks -posts')
            .select('-delivers');

        return res.json(homeworks);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

const homeworkExpiredFindByGroupController = async (req, res) => {
    const { id } = req.params;
    const authUser = req.user;
    try {
        const requestedGroup = await Group.findById(id);
        if (!requestedGroup) {
            return res.status(404).json({
                status: false,
                message: 'El grupo no fue encontrado'
            });
        }

        const isAuthUserMember = requestedGroup.members.includes(authUser._id);
        if (!isAuthUserMember) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        } 

        const homeworks = await Homework.find({ 
            group: id, 
            dueDate: { $lt: currentDate },
            'delivers.user': { $ne: authUser._id }
            //$expr: { $lt: [ '$delivers.date', '$dueDate' ] }
        })
            .populate('group', '-members -admins -subgroups -homeworks -posts')
            .select('-delivers');

        return res.json(homeworks);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}


const homeworkCreateDeliverContoller = async (req, res) => {
    // id de la tarea
    const { id } = req.params;
    const files = req.files;
    const authUser = req.user;
    try {
        const homework = await Homework.findById(id);
        if (!homework) {
            return res.status(404).json({
                status: false,
                message: 'Tarea no encontrada'
            });
        }

        const group = await Group.findById(homework.group);
        if (!group) {
            return res.status(404).json({
                status: false,
                message: 'Grupo no encontrado'
            });
        }

        const isAuthUserMember = group.members.includes(authUser._id);
        if (!isAuthUserMember) {
            return res.status(403).json({
                status: false,
                message: 'Permiso denegado'
            });
        }

        const currentDate = new Date();
        if (homework.dueDate < currentDate) {
            return res.status(403).json({
                status: false,
                message: 'Se venció la fecha de entrega'
            });
        }

        // Ya se subio la tarea
        const deliverExists = homework.delivers.find(deliver => 
            deliver.user.toString() === authUser._id.toString());
        if (deliverExists) {
            return res.status(409).json({
                status: false,
                message: 'Ya se entregó la tarea'
            });
        }

        const attachments = files.map(file => {
            return {
                name: file.originalname,
                contentType: file.mimetype,
                url: `/uploads/${ file.filename }`
            }
        });
        homework.delivers.push({
            user: authUser._id,
            date: new Date(),
            attachments
        });

        await homework.save();

        return res.status(201).json({
            status: true,
            message: 'La tarea fue entregada'
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Ocurrio un error en el servidor'
        });
    }
}

export default {
    create: createHomeworkController,
    update: updateHomeworkController,
    delete: deleteHomeworkController,
    findOne: homeworkFindOne,
    findByUser: homeworkFindByUserController,
    findPendingByUser: homeworkPendingFindByUserController,
    findExpiredByUser: homeworkExpiredFindByUserController,
    findByGroup: homeworkFindByGroupController,
    findPendingByGroup: homeworkPendingFindByGroupController,
    findExpiredByGroup: homeworkExpiredFindByGroupController,
    createDeliver: homeworkCreateDeliverContoller
};