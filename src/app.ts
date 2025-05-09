import express, { Request, Response } from 'express';
import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { Server, Socket } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

// Типізація обробника для маршруту
app.get('/', (req: Request, res: Response): void => {
    res.send('Hello');
});

// Типізація події підключення
io.on('connection', (socket: Socket): void => {
    console.log('a user connected');
});

const PORT = process.env.PORT || 3009;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
