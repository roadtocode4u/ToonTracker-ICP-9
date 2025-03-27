import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import TvShow from "./models/TvShow.js";
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

app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

app.get("/tv-shows", async (req, res) => {
  const tvShows = await TvShow.find();

  return res.status(200).json({
    success: true,
    data: tvShows,
    message: "TV shows fetched successfully",
  });
});

app.post("/tv-shows", async (req, res) => {
  const { title, timing, channel, thumbnail } = req.body;

  const newTvShow = new TvShow({
    title,
    timing,
    channel,
    thumbnail,
  });

  const savedTvShow = await newTvShow.save();

  return res.status(201).json({
    success: true,
    data: savedTvShow,
    message: "TV show added successfully",
  });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
