import Group from '../models/group.model.js';

const createGroupController = async (req, res) => {
    const { name, description, privacity, avatar } = req.body;

    const group = new Group({
        name,
        description,
        avatar,
        privacity
    });
}

const CreateuserSubGroupController = async (req, res) => {
    
};

const updateGroupController = async (req, res) => {
    
};

const addUserToGroupController = async (req, res) => {
   
};

const findUserGroupsController = async (req, res) => {
    
};

const findAllPublicGroupsController = async (req, res) => {
    
};


const jointoPrivateGroupController = async (req, res) => {
   
};

export default {
    createGroupController,
    CreateuserSubGroupController,
    updateGroupController,
    addUserToGroupController,
    findUserGroupsController,
    findAllPublicGroupsController,
    jointoPrivateGroupController
};