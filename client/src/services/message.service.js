import axios from 'axios';

class MessageService {
    static async create(message, chatId) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/chats/${ chatId }/messages`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify(message)
            }
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async createUploads(message, chatId) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/chats/${ chatId }/messages/uploads`,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                data: message
            }
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

    static async findByChat(chatId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/chats/${ chatId }/messages`,
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
}

export default MessageService;

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