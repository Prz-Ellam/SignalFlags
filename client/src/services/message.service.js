import axios from 'axios';

export const createMessage = async (message, chatId) => {
    try {
        const configuration = {
            method: 'POST',
            url: `/api/v1/chats/${ chatId }/messages`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ localStorage.getItem('token') || '' }`
            },
            data: JSON.stringify(message)
        }
        const response = await axios(configuration);
        return response.data;
    }
    catch (exception) {
        return exception.response.data;
    }
};

export const updateMessage = async (message) => {

};

export const deleteMessage = async (message) => {

};

export const messageFindAllByChatService = async (chatId) => {
    try {
        const configuration = {
            method: 'GET',
            url: `/api/v1/chats/${ chatId }/messages`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ localStorage.getItem('token') || '' }`
            }
        }
        const response = await axios(configuration);
        return response.data;
    }
    catch (exception) {
        return exception.response.data;
    }    
}