import app from '../configuration/firebase.js';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';

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

export const createImageFirebase = async(req, res) => {
    const storage = getStorage(app);
    console.log(req.file);
    const file = req.file;
    if (!file) res.status(404).json({
        status: false,
        message: 'No se encontró imagen'
    });

    const datetimestamp = Date.now();
    const storageRef = ref(storage, `profile-pictures/${ file.originalname }-${datetimestamp}`);

    let metadata = {contentType: file.mimetype, name: file.originalname}
    const snapshot = await uploadBytesResumable(storageRef, file.buffer, metadata);
    
    const url = await getDownloadURL(snapshot.ref); 
    
    res.json({
        file: url
    });
}