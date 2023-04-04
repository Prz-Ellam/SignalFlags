import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { errorsToObject } from '../../utilities/errors-to-object.js';

export const validateCreateUser = async (req, res, next) => {
    const userSchema = {
        type: 'object',
        properties: {
            profilePicture: {
                type: 'string'
            },
            email: {
                type: 'string',
                minLength: 1,
                maxLength: 255,
                format: 'email',
                errorMessage: {
                    type: 'El correo electrónico debe ser una cadena de texto',
                    minLength: 'El correo electrónico es requerido',
                    maxLength: 'El correo electrónico es demasiado largo, solo 255 caracteres son admitidos',
                    pattern: 'El formato del correo electrónico no es válido',
                    format: 'El correo electrónico no es válido'
                }
            },
            username: {
                type: 'string',
                minLength: 1,
                maxLength: 50,
                pattern: ""
            },
            password: {
                type: 'string',
                pattern: '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[°|¬!"#$%&/()=?¡\'¿¨*\\]´+}~`{[^;:_,.\-<>@]).{8,}$',
                errorMessage: {
                    type: 'La contraseña debe ser una cadena de texto',
                    pattern: 'La contraseña no cumple con todos los requisitos (Al menos una mayúscula, una minúscula, un número, un caracter especial y 8 carácteres)'
                }
            },
            confirmPassword: {
                type: 'string',
                const: {
                    $data: '1/password'
                }
            }
        },
        required: [ 'profilePicture', 'email', 'username', 'password', 'confirmPassword' ],
        additionalProperties: false
    };

    const ajv = new Ajv({ allErrors: true, $data: true });
    addFormats(ajv);
    addErrors(ajv);
    const isValid = ajv.validate(userSchema, req.body);

    if (!isValid)
        return res.status(422).json({
            'status': isValid, message: errorsToObject(ajv.errors)
        });

    next();
}