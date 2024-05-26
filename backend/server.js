const mongoose = require("mongoose");
const dotenv = require("dotenv");
const http = require("http");

// Uncaught Exception Handling
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

// Read the environment variables from the config.env file
dotenv.config({ path: "./config.env" });
const app = require("./app");

// Connect to the database
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// Starting the server
const port = process.env.PORT || 3000;
const server = http.createServer(app);

//socket.io
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_conversation", (conversationId) => {
    socket.join(conversationId);
    console.log(
      `User with ID: ${socket.id} joined conversation: ${conversationId}`
    );
  });

  socket.on("send_message", (data) => {
    io.to(data.conversationId).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Unhandled Rejection Handling
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
