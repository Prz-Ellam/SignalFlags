import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { errorsToObject } from '../../utilities/errors-to-object.js';

export const validateCreateGroup = async (req, res, next) => {
    const groupSchema = {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                minLength: 1,
                maxLength: 50
            },
            description: {
                type: 'string',
                minLength: 1,
                maxLength: 255
            },
            privacy: {
                type: 'string',
                enum: [ 'public', 'private' ]
            },
            avatar: {
                type: 'string'
            }
        },
        required: [ 'name', 'description', 'privacy', 'avatar' ],
        additionalProperties: false,
        errorMessage: {
            required: 'Las propiedades son requeridas',
            additionalProperties: 'No propiedades addicionales'
        }
    };

    const ajv = new Ajv({ allErrors: true, $data: true });
    addFormats(ajv);
    addErrors(ajv);
    const isValid = ajv.validate(groupSchema, req.body);

    if (!isValid)
        return res.status(422).json({
            'status': isValid, message: errorsToObject(ajv.errors)
        });

    next();
}