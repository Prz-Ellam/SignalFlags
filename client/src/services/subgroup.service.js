import axios from 'axios';

class SubgroupService {
    static async create(subgroup) {
        try {
            const configuration = {
                method: 'POST',
                url: `/api/v1/groups/${ groupId }/subgroups`,
                headers: { 
                'Content-Type': 'application/json'
                },
                data: JSON.stringify(subgroup)
            };
    
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
                url: `/api/v1/groups/${ groupId }/subgroups`,
                headers: { 
                'Content-Type': 'application/json'
                }
            };
    
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }
}

export default SubgroupService;