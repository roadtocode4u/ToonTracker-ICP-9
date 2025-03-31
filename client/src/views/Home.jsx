import axios from "axios";
import React, { useEffect, useState } from "react";
import TvShowCard from "../components/TvShowCard";

function Home() {
  const [tvShows, setTvShows] = useState([]);

  const loadTvShows = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/tv-shows`
    );

    setTvShows(response.data.data);
  };

  useEffect(() => {
    loadTvShows();
  }, []);

  return (
    <div>
      <h1>Toon Tracker</h1>

      {tvShows.map((serialObj) => {
        const { _id, title, timing, channel, thumbnail } = serialObj;

        return (
          <TvShowCard
            key={_id}
            _id={_id}
            title={title}
            timing={timing}
            channel={channel}
            thumbnail={thumbnail}
          />
        );
      })}
    </div>
  );
}

export default Home;
