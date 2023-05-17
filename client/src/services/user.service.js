import axios from 'axios';

class UserService {
    static async login(user) {
        try {
            const configuration = {
                method: 'POST',
                url: '/api/v1/users/auth',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(user)
            }
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async logout() {
        try {
            const configuration = {
                method: 'DELETE',
                url: '/api/v1/users/auth',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async create(user) {
        try {
            const configuration = {
                method: 'POST',
                url: '/api/v1/users',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : JSON.stringify(user)
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

    static async find() {
        try {
            const configuration = {
                method: 'GET',
                url: '/api/v1/users',
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

    static async findById(userId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/users/${ userId }`,
                headers: { 
                'Content-Type': 'application/json'
                }
            };
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            if (exception.response)
                return exception.response.data;
            else
                throw exception;
        }
    }

    static async findWithoutChat() {
        try {
            const configuration = {
                method: 'GET',
                url: '/api/v1/users/without-chat',
                headers: { 
                'Content-Type': 'application/json'
                }
            };
    
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            if (exception.response)
                return exception.response.data;
            else
                throw exception;
        }
    }
}

export default UserService;
