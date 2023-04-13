import Homework from '../models/homework.model.js';
import Group from '../models/group.model.js';

const createHomeworkController = async (req, res) => {
    const { groupId } = req.params;
    const { name, description, dueDate } = req.body;

    const requestedGroup = await Group.findById(groupId);
    if (!requestedGroup) {
        return res.status(404).json({
            status: false,
            message: 'El grupo no existe'
        });
    }

    try {
        const homework = new Homework({
            name,
            description,
            dueDate,
            group: groupId
        });

        await homework.save();

        return res.status(201).json({
            status: true,
            message: 'La tarea fue creada éxitosamente'
        });
    }
    catch (exception) {
        return res.status(500).json({
            status: false,
            message: 'Hubo un error en el servidor'
        });
    }
}

const uploadHomeworkController = async (req, res) => {
    const { groupId, homeworkId } = req.params;
    const { name, description, dueDate } = req.body;

    const homework = await Homework.findById(homeworkId);
    if (!homework) {
        return res.status(404).json({
            status: false,
            message: 'La tarea no existe'
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
    const { groupId, homeworkId } = req.params;

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

const homeworkFindByUserController = async (req, res) => {
    const { userId } = req.params;

    Homework.find({  })
}

const homeworkFindByGroupController = async (req, res) => {
    const { groupId } = req.params;
    try {
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
    createHomeworkController,
    uploadHomeworkController,
    deleteHomeworkController,
    homeworkFindByUserController,
    homeworkFindByGroupController
};