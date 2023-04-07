import axios from 'axios';

export const chatFindAllByUserService = async (userId) => {
    try {
        const configuration = {
            method: 'GET',
            url: `/api/v1/users/${ userId }/chats`,
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