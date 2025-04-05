import TvShow from "./../models/TvShow.js";

const getTvShows = async (req, res) => {
  const tvShows = await TvShow.find();

  return res.status(200).json({
    success: true,
    data: tvShows,
    message: "TV shows fetched successfully",
  });
};

const postTvShows = async (req, res) => {
  const { title, timing, channel, thumbnail } = req.body;

  if(!title){
    return res.status(400).json({
      success: false,
      message: "Title is required",
      data: null,
    });
  }

  if(!timing){
    return res.status(400).json({
      success: false,
      message: "Timing is required",
      data: null,
    });
  }

  if(!channel){
    return res.status(400).json({
      success: false,
      message: "Channel is required",
      data: null,
    });
  }

  if(!thumbnail){
    return res.status(400).json({
      success: false,
      message: "Thumbnail is required",
      data: null,
    });
  }

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
};

const getTvShowsById = async (req, res) => {
  const { id } = req.params;

  try {
    const tvShow = await TvShow.findById(id);

    if (!tvShow) {
      return res.status(404).json({
        success: false,
        message: "TV show not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      data: tvShow,
      message: "TV show fetched successfully",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: e.message,
      data: null,
    });
  }
};

const deleteTvShowsById = async (req, res) => {
  const { id } = req.params;

  await TvShow.deleteOne({ _id: id });

  return res.status(200).json({
    success: true,
    message: "TV show deleted successfully",
  });
};

export { deleteTvShowsById, getTvShows, getTvShowsById, postTvShows };
