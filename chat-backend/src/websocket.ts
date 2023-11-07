import { io, app } from "./http";

interface User {
  id: number;
}

interface Message {
  id: string;
  text: string;
  room: number;
  userId: number;
}

interface Conversation {
  id: number;
  code: string;
  name: string;
  users?: User[];
  messages?: Message[];
}

const users: User[] = [];
const messages: Message[] = [];
const conversations: Conversation[] = [
  {
    id: 1,
    code: "329023452345",
    name: "Teste1",
    users: [{ id: 359 }],
    messages: [],
  },
];

function generate() {
  return parseInt((Math.random() * (10000 - 0) + 0).toString());
}

io.on("connection", (socket) => {
  socket.on("select room", (data, callback: any) => {
    socket.rooms.forEach((room) => {
      if (room !== socket.id) {
        socket.leave(room);
      }
    });

    const room = data.room.toString();
    socket.join(room);

    const allMessages = messages.filter((item) => {
      return item.room.toString() === room;
    });

    callback({
      allMessages,
    });
  });

  socket.on("message", (data) => {
    const message = {
      id: generate().toString(),
      userId: data.userId.toString(),
      room: data.room.toString(),
      text: data.text.toString(),
    };

    messages.push(message);

    io.to(message.room).emit("message", message);
  });

  socket.on("leave room", (data) => {
    const room = data.room.toString();
    socket.leave(room);
  });
});
