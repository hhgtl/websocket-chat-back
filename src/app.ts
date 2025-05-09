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
const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});