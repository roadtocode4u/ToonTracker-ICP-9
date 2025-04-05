import axios from "axios";
import {
  TvMinimalPlay as ChannelIcon,
  Clock as ClockIcon,
  Trash2 as TrashIcon,
} from "lucide-react";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "./Button";
import Modal from "./Modal";

const deleteTvShow = async (id, loadTvShows) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_API_URL}/tv-shows/${id}`
    );
    toast.success(response.data.message);
    loadTvShows();
  } catch (e) {
    toast.error(e.response.data.message);
  }
};

function TvShowCard({ _id, title, timing, channel, thumbnail, loadTvShows }) {
  const [isConfirmationOpen, setIsConfirmationOpen] = React.useState(false);

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 m-4 relative">
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

      <Button
        title={"delete"}
        size="sm"
        variant="danger"
        icon={<TrashIcon className="h-3 w-3 inline" />}
        iconPosition={"right"}
        className="absolute bottom-2 right-2"
        onClick={() => {
          setIsConfirmationOpen(true);
        }}
      />

      <Toaster />

      <Modal
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <div className="w-[400px]">
          <h1 className="text-2xl  mb-4">Are you sure?</h1>
          <p>
            Once you delete this TV show, it will be permanently removed from
            the database. This action cannot be undone.
          </p>

          <div className="flex justify-around">
            <Button
              title={"Cancel"}
              size="md"
              variant="secondary"
              onClick={() => setIsConfirmationOpen(false)}
            />

            <Button
              title={"Delete"}
              size="md"
              variant="danger"
              onClick={() => {
                deleteTvShow(_id, loadTvShows);
                setIsConfirmationOpen(false);
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TvShowCard;
