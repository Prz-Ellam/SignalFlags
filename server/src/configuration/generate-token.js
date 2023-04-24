import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || '0100100b';

export const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: '30d'
    });
}

export const verifyToken = (token) => {
    try {
        jwt.verify(token, JWT_SECRET);
    }
    catch (exception) {

    }
}