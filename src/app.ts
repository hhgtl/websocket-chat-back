import express, { Request, Response } from 'express';
import { createServer } from 'node:http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello');
});

io.on('connection', (socket: Socket): void => {
    console.log('a user connected');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});