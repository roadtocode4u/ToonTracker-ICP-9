import React from "react";
import { Clock as ClockIcon, TvMinimalPlay as ChannelIcon} from "lucide-react";

function TvShowCard({ _id, title, timing, channel, thumbnail }) {
  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 m-4">
      <img
        src={thumbnail}
        alt={title}
        className="h-[250px] w-[400px] object-cover "
      />
      <h2 className="text-2xl my-2">{title}</h2>
      <p className="text-lg mb-2">
        <ClockIcon className="inline mr-2 mb-1" /> {timing}
      </p>
      <p className="text-lg">
        <ChannelIcon className="inline mr-2 mb-1" /> {channel}
      </p>
    </div>
  );
}

export default TvShowCard;
