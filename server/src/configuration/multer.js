import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
        cb(null, path.join(__dirname, '../../../uploads'))
    },
    filename: function (_req, file, cb) {
        const datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

export const memoryUpload = multer({ storage: multer.memoryStorage() });

export const multerUpload = multer({
    storage: storage,
    fileFilter: function (_req, file, callback) {
        const ext = path.extname(file.originalname);
        const allowedExtension = [ '.png', '.jpg', '.jpg' ];
        if (!allowedExtension.includes(ext)) {
            return callback(null, false);
        }
        callback(null, true);
    },
    limits: {
        fieldSize: 1024 * 1024
    }
});

export const multerUpload2 = multer({
    storage: storage,
    fileFilter: function (_req, file, callback) {
        callback(null, true);
    },
    limits: {
        fieldSize: 1024 * 1024
    }
});