import axios from "axios";
import { SquarePlus as SquarePlusIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/Button";
import Input from "../components/Input";
import Modal from "../components/Modal";
import TvShowCard from "../components/TvShowCard";

function Home() {
  const [tvShows, setTvShows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // For new show
  const [newShow, setNewShow] = useState({
    title: "",
    timing: "",
    channel: "",
    thumbnail: "",
  });

  const addTvShow = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/tv-shows`,
        {
          title: newShow.title,
          timing: newShow.timing,
          channel: newShow.channel,
          thumbnail: newShow.thumbnail,
        }
      );
      toast.success(response.data.message);

      loadTvShows();
      setIsModalOpen(false);
      setNewShow({
        title: "",
        timing: "",
        channel: "",
        thumbnail: "",
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

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
      <div className="h-15 w-15 cursor-pointer fixed bottom-5 right-5 bg-blue-500 text-white  shadow-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center rounded-full">
        <SquarePlusIcon
          onClick={() => {
            setIsModalOpen(true);
          }}
          className="h-10 w-10"
        />
      </div>

      <div className="flex flex-wrap justify-center">
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="w-[400px]">
          <h1 className="font-bold mb-3">Add New Show</h1>

          <Input
            type="text"
            paceholder="Title"
            value={newShow.title}
            onChange={(val) => {
              setNewShow({ ...newShow, title: val });
            }}
          />

          <Input
            type="text"
            paceholder="Timing"
            value={newShow.timing}
            onChange={(val) => {
              setNewShow({ ...newShow, timing: val });
            }}
          />

          <Input
            type="text"
            paceholder="Channel"
            value={newShow.channel}
            onChange={(val) => {
              setNewShow({ ...newShow, channel: val });
            }}
          />

          <Input
            type="text"
            paceholder="Thumbnail"
            value={newShow.thumbnail}
            onChange={(val) => {
              setNewShow({ ...newShow, thumbnail: val });
            }}
          />

          {newShow.thumbnail ? (
            <img
              src={newShow.thumbnail}
              alt="Thumbnail"
              className="w-full h-40 object-cover rounded-md mb-3"
            />
          ) : null}

          <div>
            <Button
              title={"Add Show"}
              onClick={() => {
                addTvShow();
              }}
              variant="primary"
              size="lg"
              icon={<SquarePlusIcon className="h-5 w-5 inline" />}
              iconPosition={"right"}
            />
          </div>
        </div>
      </Modal>
      <Toaster />
    </div>
  );
}

export default Home;
