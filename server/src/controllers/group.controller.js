import User from '../models/group.model.js';

const groupCreateController = async (req, res) => {
    const { name, description, privacity, avatar } = req.body;
}

const userCreateSubGroupController = async (req, res) => {
    
};

const groupUpdateController = async (req, res) => {
    
};

const addUserToGroupController = async (req, res) => {
   
};

export default {
    groupCreateController,
    userCreateSubGroupController,
    groupUpdateController,
    addUserToGroupController
};