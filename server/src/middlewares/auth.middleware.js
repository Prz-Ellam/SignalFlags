import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const { id } = req.params;
    const token = req.get('Authorization');
    try {
        const decode = jwt.verify(token, 'Jeff');
        if (decode.id !== id) {
            return res.status(401).json({
                status: false,
                message: 'No autorizado'
            });
        }
        next();
    }
    catch(e) {
        return res.status(401).json({
            status: false,
            message: 'No autorizado'
        });
    }
}