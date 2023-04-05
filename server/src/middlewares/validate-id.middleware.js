import { Types } from 'mongoose';

// Verifica que los parametros de la ruta sean ObjectID
export const validateIdMiddleware = async (req, res, next) => {
    for (const [_key, value] of Object.entries(req.params)) {
        if (!Types.ObjectId.isValid(value)) {
            return res.status(400).json({ 
                status: false,
                mensaje: 'El ID proporcionado no es válido' 
            });
        }
    }
    next();
}