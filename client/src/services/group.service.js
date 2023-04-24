import axios from 'axios';

class GroupService {
    static async create(group) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/groups`,
                headers: { 
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(group)
            };
    
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async update() {

    }

    static async delete() {

    }

    static async findByUser(userId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/users/${userId}/groups`,
                headers: { 
                'Content-Type': 'application/json'
                }
            };
    
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async findById(id) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/groups/${ id }`,
                headers: { 
                'Content-Type': 'application/json'
                }
            };
    
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }
}

export default GroupService;