import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { errorsToObject } from '../../utilities/errors-to-object';

export const validateCreateHomework = (req, res, next) => {
    const postSchema = {
        type: 'object',
        properties: {
            content: {
                type: 'string',
                minLength: 1,
                maxLength: 50
            }
        },
        required: [ 'content' ],
        additionalProperties: false
    }

    const ajv = new Ajv({ allErrors: true, $data: true });
    addFormats(ajv);
    addErrors(ajv);
    const isValid = ajv.validate(postSchema, req.body);

    if (!isValid)
        return res.status(422).json({
            'status': isValid, message: errorsToObject(ajv.errors)
        });

    next();
}