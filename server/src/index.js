import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import User from './models/user.model.js';

import database from './configuration/database.js';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*'
    }
});

await database();

app.use(cors());
app.use(express.json());

io.on('connection', socket => {
    console.log('A new connection in the server');
    socket.emit('message', 'Welcome to SignalFlags');
});

app.post('/', (_req, res) => {
    res.json('GET OK');
});


app.post('/api/v1/users', async (request, response) => {
    console.log(request.body);

    const user = new User();
    user.email = request.body.email;
    user.username = request.body.username;
    user.password = request.body.password;

    await user.save();

    response.send('Usuario atrapado');
});

httpServer.listen(3000, async () => {
    console.log('Server started in port 3000');
});