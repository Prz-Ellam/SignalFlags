import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';

export const validateCreateGroup = async (req, res, next) => {
    const groupSchema = {
        type: 'object',
        properties: {
            name: {
                type: 'string'
            },
            description: {
                type: 'string'
            }
        }
    }
}