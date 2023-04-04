import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import database from './configuration/database.js';
import userRouter from './routes/user.routes.js';
import groupRouter from './routes/group.routes.js';
import homeworkRouter from './routes/homework.routes.js';
import imageRouter from './routes/image.routes.js';
import chatRouter from './routes/chat.routes.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

await database();

app.set('port', 3000);

app.use(cors());
app.use(express.json());
app.use('/api/v1/images', express.static('../uploads/'));

io.on('connection', socket => {
    console.log('A new connection in the server');
    socket.emit('message', 'Welcome to SignalFlags');
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/homeworks', homeworkRouter);

httpServer.listen(app.get('port'), async () => {
    console.log(`Server started in port ${ app.get('port') }`);
});