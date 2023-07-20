import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";
import path from "path";
// import sequelize from "@/utils/database.js";
import languagesRoutes from "./src/routes/languages.js";
import leaderBoardRoutes from "./src/routes/leaderBoards.js";
import questionsRoutes from "./src/routes/questions.js";

/* Constants */
const app = express();
const server = http.createServer(app);

/* CONFIGURATIONS  */
dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(express.static(path.join(__dirname, "public")));

/* HTTP APP ROUTES */
/* ROUTES */
app.use("/languages", languagesRoutes);
app.use("/leaderBoards", leaderBoardRoutes);
app.use("/questions", questionsRoutes);

/* HTTP SOCKET ROUTES */
const io = new Server(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});
const emailToSocketIdMap = new Map();
const socketIdToEmailMap = new Map();
io.on("connection", (socket) => {
  socket.on(`room:join`, (data) => {
    const { emailId, roomNumber } = data;
    emailToSocketIdMap.set(emailId, socket.id);
    socketIdToEmailMap.set(socket.id, emailId);

    /* If new user want to join */
    io.to(roomNumber).emit("user:joined", { emailId, roomNumber: socket.id });

    /* Allow the user to join the given room number */
    socket.join(roomNumber);

    /* Then push the user to the room */
    io.to(socket.id).emit("room:join", data);
  });

  /* Handle Incoming Call offer */
  socket.on("user:call", ({ to, offer }) => {
    io.to(to).emit("incoming:call", { from: socket.id, offer });
  });

  /* Handle Call Accept offer */
  socket.on("call:accepted", ({ to, answerCall }) => {
    io.to(to).emit("call:accepted", { from: socket.id, answerCall });
  });

  /* Handle negotiation Accept offer */
  socket.on("peer:nego:needed", ({ offer, to }) => {
    io.to(to).emit("peer:nego:needed", { from: socket.id, offer });
  });

  /* Handle negotiation complete offer */
  socket.on("peer:nego:done", ({ to, answer }) => {
    io.to(to).emit("peer:nego:final", { from: socket.id, answer });
  });
});

/* MONGOOSE SETUP */
const PORT = process.env.PORT;
const URL = process.env.MONGO_URL || "";
var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false, // Don't build indexes,
  dbName: "language-learning",
};

mongoose
  .connect(URL, options)
  .then(async () => {
    server.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((err) => console.log(`${err} didn't connect`));
