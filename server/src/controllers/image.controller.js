export const findImage = async (request, response) => {
    
}

export const createImage = async(req, res) => {
    if (!req.file) {
        return res.status(400).send({});
    }
    res.send({
        file: req.file.filename
    });
}