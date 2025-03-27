import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGODB_URI);

  if (conn) {
    console.log("MongoDB connected successfully");
  }
};

const TV_SHOWS = [];

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.get("/tv-shows", (req, res) => {
  return res.status(200).json({
    success: true,
    data: TV_SHOWS,
    message: "TV shows fetched successfully",
  });
});

app.post("/tv-shows", (req, res) => {
  const { title, timing, channel, thumbnail } = req.body;

  const newTVShow = {
    title,
    timing,
    channel,
    thumbnail,
  };

  TV_SHOWS.push(newTVShow);

  return res.status(201).json({
    success: true,
    data: newTVShow,
    message: "TV show added successfully",
  });
});

const PORT = 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
