import express, {Request, Response} from 'express';
import {createServer} from 'node:http';
import {Server} from 'socket.io';
import cors from 'cors';

type User = {
    name: string,
    id: string
}

type Message = {
    message: string;
    id: string;
    user: User
}


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

let messages: Message[] = []

const usersState = new Map()


io.on('connection', (socketChannel) => {

    usersState.set(socketChannel, {id: new Date().getTime().toString(), name: "anonym"})

    io.on('disconnect', () => {
        console.log('User disconnected');
        usersState.delete(socketChannel);
    })

    socketChannel.on('client-name-sent', (name: string) => {
       const user = usersState.get(socketChannel)
        user.name = name
    })

    socketChannel.on('client-message-sent', (message: string) => {
        const user = usersState.get(socketChannel)

        let messageItem = {message, id: new Date().getTime().toString(), user: {id: user.id, name: user.name}};
        messages.push(messageItem);
        io.emit('new-message-sent', messageItem);
    });


    socketChannel.on('reset-messages-sent', () => {
        messages = []
        io.emit('init-messages-published', messages);
    })

    socketChannel.emit('init-messages-published', messages)
    console.log('a user connected');
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});