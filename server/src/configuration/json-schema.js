import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { Types } from 'mongoose';
import { errorsToObject } from '../utilities/errors-to-object.js';

const validateObjectIdFormat = (value) => {
    return Types.ObjectId.isValid(value);
}

const ajv = new Ajv({ allErrors: true, $data: true });
ajv.addFormat('ObjectID', validateObjectIdFormat);
addFormats(ajv);
addErrors(ajv);

ajv.errorsToObject = function() {
    return errorsToObject(this.errors);
}

export default ajv;