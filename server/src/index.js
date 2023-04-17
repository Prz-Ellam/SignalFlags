import './configuration/env.js';

import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

import database from './configuration/database.js';
import userRouter from './routes/user.routes.js';
import groupRouter from './routes/group.routes.js';
import homeworkRouter from './routes/homework.routes.js';
import imageRouter from './routes/image.routes.js';
import chatRouter from './routes/chat.routes.js';
import chatGroupRouter from './routes/chat-group.routes.js';
import postRouter from './routes/post.routes.js';
import { notFoundMiddleware } from './middlewares/not-found.middleware.js';
import socket from './events/socket.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

await database();

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use('/uploads', express.static('../uploads/'));
app.use('/api/v1/images', express.static('../uploads/'));
app.use('/api/v1/users', userRouter);
app.use('/api/v1/images', imageRouter);
app.use('/api/v1/chats', chatRouter);
app.use('/api/v1/chatGroups', chatGroupRouter);
app.use('/api/v1/groups', groupRouter);
app.use('/api/v1/homeworks', homeworkRouter);
app.use('/api/v1/posts', postRouter);

app.use(notFoundMiddleware);

socket(io);

httpServer.listen(app.get('port'), async () => {
    console.log(`Server started on port ${ app.get('port') }`);
});