import axios from 'axios';

export const createImage = async (image) => {
    const formData = new FormData();
    formData.append('image', image, image.name);
    
    const configuration = {
        method: 'POST',
        url: 'http://localhost:3000/api/v1/images',
        headers: { 
          'Content-Type': 'multipart/form-data'
        },
        data : formData
    };

    try {
        const response = await axios(configuration);
        return response.data;
    }
    catch (exception) {
        return exception.response.data;
    }
}