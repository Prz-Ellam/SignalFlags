import axios from 'axios';

class ImageService {
    static async create(image) {
        const formData = new FormData();
        formData.append('image', image, image.name);

        const configuration = {
            method: 'POST',
            url: '/api/v1/images',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        };

        try {
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }

    static async createFirebase(image) {
        const formData = new FormData();
        formData.append('image', image, image.name);

        const configuration = {
            method: 'POST',
            url: '/api/v1/images/firebase',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        };

        try {
            const response = await axios(configuration);
            return response.data;
        }
        catch (exception) {
            return exception.response.data;
        }
    }
}

export default ImageService;
