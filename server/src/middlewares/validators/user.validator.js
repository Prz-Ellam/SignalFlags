import Ajv from 'ajv';
import addErrors from 'ajv-errors';
import addFormats from 'ajv-formats';
import { errorsToObject } from '../../utilities/errors-to-object.js';

export const validateCreateUser = async (req, res, next) => {
    const userSchema = {
        type: 'object',
        properties: {
            avatar: {
                type: 'string',
                errorMessage: {
                    type: 'La foto de perfil debe ser una cadena de texto'
                }
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
                minLength: 3,
                maxLength: 20,
                pattern: "^(?=[a-zA-Z0-9._ \u00C0-\u00FF]{3,50}$)(?!.*[_. ]{2})[^_. ].*[^_. ]$",
                errorMessage: {
                    type: 'El nombre de usuario debe ser una cadena de texto',
                    minLength: 'El nombre de usuario es demasiado corto, al menos 3 caracteres son necesarios',
                    maxLength: 'El nombre de usuario es demasiado largo, solo 20 caracteres son admitidos',
                    pattern: 'El nombre de usuario que ingresó no es válido'
                }
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
                minLength: 1,
                maxLength: 255,
                const: {
                    $data: '1/password'
                },
                errorMessage: {
                    type: 'La confirmación de contraseña debe ser una cadena de texto',
                    minLength: 'La confirmación de contraseña es requerida',
                    maxLength: 'La confirmación de contraseña es demasiado larga, solo 255 caracteres son admitidos',
                    const: 'La confirmación de contraseña no coincide con la contraseña'
                }
            }
        },
        required: [ 'avatar', 'email', 'username', 'password', 'confirmPassword' ],
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