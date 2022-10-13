import express, { Express, Request, Response } from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { harperSaveMessage } from "./services/harper-save-message";
import { harperGetMessages } from "./services/harper-get-messages";
import { leaveRoom } from "./utils/leaveRoom";

dotenv.config();

interface User {
  id: string;
  username: string;
  room: string;
}

const CHAT_BOT = "ChatBot";
let chatRoom = "";
let allUsers: User[] = [];

const SERVER_PORT = process.env.SERVER_PORT;
const CLIENT_PORT = process.env.CLIENT_PORT;

const app: Express = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: `http://localhost:${CLIENT_PORT}`,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Add user to room
  socket.on("join_room", (data) => {
    const { username, room } = data;
    socket.join(room);
    // event time
    let __createdtime__ = Date.now();
    // Let everyone in the room know usernam joined the room
    socket.to(room).emit("receive_message", {
      message: `${username} has joined the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
    // Welcome username into the chat room
    socket.emit("receive_message", {
      message: `Welcome ${username}`,
      username: CHAT_BOT,
      __createdtime__,
    });
    chatRoom = room;
    allUsers.push({ id: socket.id, username, room });
    const chatRoomUsers = allUsers.filter((u) => u.room === room);
    socket.to(room).emit("chatroom_users", chatRoomUsers);
    socket.emit("chatroom_users", chatRoomUsers);
    // Get last 100 messages
    harperGetMessages(room)
      ?.then((lastMessages) => {
        // console.log(lastMessages);
        socket.emit("last_messages", lastMessages);
      })
      .catch((err) => console.log(err));
  });

  // Listen to send_message
  socket.on("send_message", (data) => {
    const { message, username, room, __createdtime__ } = data;
    io.in(room).emit("receive_message", data);
    const savePromise = harperSaveMessage(
      message,
      username,
      room,
      __createdtime__
    );
    if (savePromise === null) console.log("Empty promise saving message to DB");
    else {
      savePromise
        .then((response: any) => console.log(response))
        .catch((err: Error) => console.log(err));
    }
  });

  // Remove user from room
  socket.on("leave_room", (data) => {
    const { username, room } = data;
    socket.leave(room);
    const __createdtime__ = Date.now().toString();
    allUsers = leaveRoom(socket.id, allUsers);
    socket.to(room).emit("chatroom_users", allUsers);
    socket.to(room).emit("receive_message", {
      message: `${username} has left the chat room`,
      username: CHAT_BOT,
      __createdtime__,
    });
    console.log(`${username} has left the chat room`);
  });

  // Listen for disconnects from users
  socket.on("disconnect", () => {
    console.log("User disconnected from the chat");
    const user = allUsers.find((u) => u.id == socket.id);
    if (user?.username) {
      allUsers = leaveRoom(socket.id, allUsers);
      socket.to(user.room).emit("chatroom_users", allUsers);
      socket.to(user.room).emit("receive_message", {
        message: `${user.username} has disconnected the chat room`,
        username: CHAT_BOT,
        //   __createdtime__,
      });
    }
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
  harperGetMessages("node")
    ?.then((messages) => console.log(messages))
    .catch((err) => console.log(err));
});

server.listen(
  SERVER_PORT,
  () => `[server]: Server is running on port ${SERVER_PORT}`
);
