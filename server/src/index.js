import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*"
    }
});

app.use(express.json());

io.on('connection', socket => {
    console.log('A new connection in the server');
    socket.emit('message', 'Welcome to SignalFlags');
});

app.use('/', (_req, res) => {
    res.json('GET OK');
});

httpServer.listen(3000, () => {
    console.log('Server started in port 3000');
});