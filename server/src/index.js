import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import multer from 'multer';
import database from './configuration/database.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import userRouter from './routes/user.routes.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

await database();


const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../uploads'))
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});

const multerUpload = multer({
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



app.set('port', 3000);

app.use(cors());
app.use(express.json());

io.on('connection', socket => {
    console.log('A new connection in the server');
    socket.emit('message', 'Welcome to SignalFlags');
});

app.post('/', (_req, res) => {
    res.json('GET OK');
});

app.post('/api/v1/images', multerUpload.single('profilePicture'), 
(req, res) => {
    if (!req.file) {
        return res.status(400).send({});
    }
    res.send({
        file: req.file.filename
    });
}
);

app.use('/api/v1/users', userRouter);


httpServer.listen(app.get('port'), async () => {
    console.log(`Server started in port ${ app.get('port') }`);
});