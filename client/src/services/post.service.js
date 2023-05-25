import axios from 'axios';

class PostService {
    static async create(post, groupId) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/groups/${ groupId }/posts`,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: JSON.stringify(post)
            }
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async createUploads(post, groupId) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/groups/${ groupId }/posts/upload`,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: post
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
                url: `/api/v1/groups/${ groupId }/posts`,
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

export default PostService;