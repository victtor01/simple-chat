import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true, // Permitir credenciais
  },
});

export { serverHttp, app, io };
