import { Schema, model } from "mongoose";

const tvShowSchema = new Schema({
  title: String,
  timing: String,
  channel: String,
  thumbnail: String,
})

const TvShow = model("TvShow", tvShowSchema);

export default TvShow;
