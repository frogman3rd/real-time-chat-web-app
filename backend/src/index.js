import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path"

import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.route.js";
import { app,server } from "./lib/socket.js";

dotenv.config();


const PORT = process.env.PORT || 5001; // Default to 5001 if PORT is not set

const __dirname = path.resolve();

// Middleware setup (order matters)
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend","dist","index.html"));
    })
}

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
    connectDB();
});
