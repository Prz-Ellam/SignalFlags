import axios from 'axios';

export const chatAccessService = async (userId) => {
    try {
        const configuration = {
            method: 'POST',
            url: `/api/v1/chats`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ userId })
        }
        const response = await axios(configuration);
        return response.data;
    }
    catch (exception) {
        return exception.response.data;
    }
}

export const chatCreateChatGroupService = async (members) => {
    try {
        const configuration = {
            method: 'POST',
            url: `/api/v1/chatGroups`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({ members })
        }
        const response = await axios(configuration);
        return response.data;
    }
    catch (exception) {
        return exception.response.data;
    }
}

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