import axios from 'axios';

export const userLoginService = async (user) => {
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

export const createUser = async (user) => {
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

export const userFindAllService = async () => {
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

export const userFindOneService = async (userId) => {
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
        return exception.response.data;
    }
}

export const userFindAllWithoutChatService = async () => {
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
        return exception.response.data;
    }
}