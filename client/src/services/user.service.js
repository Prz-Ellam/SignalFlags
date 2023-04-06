import axios from 'axios';

export const userLoginService = async (user) => {
    try {
        const configuration = {
            method: 'POST',
            url: 'http://localhost:3000/api/v1/users/auth',
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
            url: 'http://localhost:3000/api/v1/users',
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
