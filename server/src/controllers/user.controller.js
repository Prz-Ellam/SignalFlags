import Ajv from 'ajv';
import User from '../models/user.model.js';

const login = async (request, response) => {
    
    const res = await User.findOne({ email: request.body.email });
    console.log(res);
    response.send({});
};

const createUser = async (request, response) => {
    
    const userSchema = {
        type: 'object',
        properties: {
            email: {
                type: 'string'
            },
            username: {
                type: 'string'
            },
            password: {
                type: 'string'
            }
        },
        required: [ 'email', 'username', 'password' ],
        additionalProperties: false
    };

    const ajv = new Ajv({ allErrors: true });
    const isValid = ajv.validate(userSchema, request.body);

    if (!isValid)
        return response.status(400).json({
            'status': isValid, message: ajv.errorsText(ajv.errors,
                { separator: '\n' })
        });
    
    console.log(request.body);

    const user = new User();
    user.profilePicture = request.body.profilePicture;
    user.email = request.body.email;
    user.username = request.body.username;
    user.password = request.body.password;
    try {
        await user.save();
    }
    catch (e) {}

    response.send('Usuario atrapado');
};

const updateUser = (request, response) => {

};

const deleteUser = (request, response) => {

};

const findOneUser = (request, response) => {

};


export default {
    createUser,
    updateUser,
    deleteUser,
    findOneUser,
    login
};