import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const authMiddleware = async (req, res, next) => {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith('Bearer')) {
        try {
            const token = authorization.split(' ')[1];
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.id).select('-password -__v');
            if (!req.user) {
                return res.status(401).json({
                    status: false,
                    message: 'No autorizado'
                });
            }

            next();
        }
        catch(ex) {
            return res.status(401).json({
                status: false,
                message: 'No autorizado'
            });
        }
    }
    else {
        return res.status(401).json({
            status: false,
            message: 'No autorizado'
        });
    }
}