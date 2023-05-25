import axios from 'axios';

class HomeworkService {
    static async create(groupId, homework) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/groups/${ groupId }/homeworks`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(homework)
            }
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async deliver(homeworkId, deliver) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/homeworks/${ homeworkId }/delivers`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: deliver
            }
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async findByUser(userId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/users/${ userId }/homeworks`,
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

    static async findByUserPending(userId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/users/${ userId }/homeworks/pending`,
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

    static async findByUserExpired(userId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/users/${ userId }/homeworks/expired`,
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

    static async findByGroup(groupId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/groups/${ groupId }/homeworks`,
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

    static async findByGroupPending(groupId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/groups/${ groupId }/homeworks/pending`,
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

    static async findByGroupExpired(groupId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/groups/${ groupId }/homeworks/expired`,
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

    static async findById(homeworkId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/homeworks/${ homeworkId }/`,
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

export default HomeworkService;