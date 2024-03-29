import axios from 'axios';

class ChatService {
    static async access(userId) {
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
            if (exception.response)
                return exception.response.data;
            else
                throw exception;
        }
    }

    static async findByUser(userId) {
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
            if (exception.response)
                return exception.response.data;
            else
                throw exception;
        }
    }

    static async findById(id) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/chats/${ id }`,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
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

    static async findMembers(chatId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/chats/${ chatId }/members`,
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

    static async encrypt(chatId) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/chats/${ chatId }/encrypt`,
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

    static async desencrypt(chatId) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/chats/${ chatId }/desencrypt`,
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

export default ChatService;

export const chatCreateChatGroupService = async (chat) => {
    try {
        const configuration = {
            method: 'POST',
            url: `/api/v1/chatGroups`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(chat)
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