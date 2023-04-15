import Group from '../models/group.model.js';

class GroupService {
    static exists = async (id) => {
        const isGroupExisting = await Group.findById(id);
        return !!isGroupExisting;
    }

    static create = async (name, description, privacy, avatar) => {
        const group = new Group({
            name,
            description,
            privacy,
            avatar
        });
    
        await group.save();
        return group;
    }

    static update = async () => {

    }

    static delete = async () => {
        
    }
}

export default GroupService;