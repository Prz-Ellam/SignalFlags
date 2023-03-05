import axios from 'axios';

export const createUser = async (user) => {
    const configuration = {
        method: 'POST',
        url: 'http://localhost:3000/api/v1/users',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : user
    };

    try {
        const response = await axios(configuration);
        return response;
    }
    catch (exception) {
        return exception;
    }
}
