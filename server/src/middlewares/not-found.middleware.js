export const notFoundMiddleware = async (req, res, next) => {
    res.status(404).json({
        status: false,
        message: 'No encontrado',
        data: req.originalUrl
    });
}