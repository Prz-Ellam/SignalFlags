import Homework from '../models/homework.model.js';
import Group from '../models/group.model.js';
import User from '../models/user.model.js';

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

    const group = await Group.findById(homework._id);
    if (!group) {
        return res.status(404).json({
            status: false,
            message: 'Grupo no encontrada'
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

        res.json(homework);
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Hubo un error en el servidor'
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
        //const homeworks = await Homework.find({ 'group': { $in: userGroupsIds } });
        
        // Las completadas
        const currentDate = new Date();
        
        const homeworks = await Homework.find({
            group: { $in: userGroupsIds },
            delivers: { $elemMatch: { user: id } },
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

        const homeworks = await Homework.find({ group: groupId });
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

export default {
    create: createHomeworkController,
    update: updateHomeworkController,
    delete: deleteHomeworkController,
    findOne: homeworkFindOne,
    findByUser: homeworkFindByUserController,
    findPendingByUser: homeworkPendingFindByUserController,
    findExpiredByUser: homeworkExpiredFindByUserController,
    findByGroup: homeworkFindByGroupController
};