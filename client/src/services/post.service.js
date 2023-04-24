import axios from 'axios';

class PostService {
    static async create(post, groupId) {
        try {
            const configuration = {
                method: 'GET',
                url: `/api/v1/groups/${ groupId }/post`,
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

    static async update() {

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