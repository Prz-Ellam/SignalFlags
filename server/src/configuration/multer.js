import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../../uploads'))
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

export const multerUpload = multer({
    storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(null, false);
        }
        callback(null, true);
    },
    limits: {
        fieldSize: 1024 * 1024
    }
});