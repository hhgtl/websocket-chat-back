import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);


app.get('/', (req, res) => {
    res.send('Hello');
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(3009, () => {
    console.log('server running at http://localhost:3009');
});