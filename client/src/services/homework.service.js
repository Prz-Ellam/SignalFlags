import axios from 'axios';

class HomeworkService {
    static async create() {

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

    static async findByGroup() {

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