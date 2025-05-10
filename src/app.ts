import express, {Request, Response} from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from 'cors';

const messagesMoke = [{
    message: 'Hello Dimych',
    id: 'qwerfsd1421',
    user: {id: 'q412fds', name: "Valera"}
}, {
    message: 'Hi Valera',
    id: 'qwe523gsdgsd',
    user: {id: '532sdgd', name: "Dimych"}
}]


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

app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
});

let messages = [...messagesMoke]


io.on('connection', (socketChannel) => {
    console.log('a user connected');
    socketChannel.on('client-message-sent', (message: string) => {
        let messageItem = {message, id: "3r2lfsa" + new Date().getTime(), user: {id: 'r23fwe', name: 'Valera'}};
        messages.push(messageItem);

        io.emit('new-message-sent', messageItem);
        console.log(message);
    });

    socketChannel.on('reset-messages-sent', () => {
        messages = [...messagesMoke]
        io.emit('init-messages-published', messages);
    })


    socketChannel.emit('init-messages-published', messages)
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});