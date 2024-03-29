import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { errorsToObject } from '../../utilities/errors-to-object';

export const validateCreateHomework = (req, res, next) => {
    const homeworkSchema = {
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
            dueDate: {
                type: 'string'
            }
        },
        required: [ 'name', 'description', 'dueDate' ],
        additionalProperties: false
    }

    const ajv = new Ajv({ allErrors: true, $data: true });
    addFormats(ajv);
    addErrors(ajv);
    const isValid = ajv.validate(homeworkSchema, req.body);

    if (!isValid)
        return res.status(422).json({
            'status': isValid, message: errorsToObject(ajv.errors)
        });

    next();
}