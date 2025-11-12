import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "https://5173-firebase-sudo-protect-megit-1762913679384.cluster-bg6uurscprhn6qxr6xwtrhvkf6.cloudworkstations.dev"],
    credentials: true,
}));

app.use(express.json());

// Routes
app.use("/api", authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("✅ MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
