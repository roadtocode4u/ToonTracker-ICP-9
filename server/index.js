import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {
  getTvShows,
  postTvShows,
  getTvShowsById,
  deleteTvShowsById
} from "./controllers/tv-shows.js";
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

app.get("/tv-shows", getTvShows);
app.post("/tv-shows", postTvShows);
app.get("/tv-shows/:id", getTvShowsById);
app.delete("/tv-shows/:id", deleteTvShowsById);

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
