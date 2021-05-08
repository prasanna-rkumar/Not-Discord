import { motion, AnimatePresence } from "framer-motion";
import { RiAddFill } from "react-icons/ri";
import { useState, FormEvent, useContext, useEffect } from "react";
import { discordFirestore } from "../../firebase";
import TextFormField from "../shared/TextFormField";
import { AppContext } from "../../contexts/AppContext";

const NewChannel = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [channelName, setChannelName] = useState("");
  const { selectedServer } = useContext(AppContext);

  useEffect(() => {
    if (!isModalVisible)
      setChannelName('')
  }, [isModalVisible]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    discordFirestore
      .collection("servers")
      .doc(selectedServer?.id)
      .collection("channels")
      .add({
        name: channelName,
      })
      .then(() => {
        setModalVisible(false);
      });
  };

  return (
    <>
      <button onClick={() => setModalVisible(true)}>
        <RiAddFill className="inline" size={22} />
      </button>
      <AnimatePresence exitBeforeEnter>
        {isModalVisible && (
          <motion.div
            exit={{
              opacity: 0,
            }}
            onClick={() => {
              setModalVisible((prev) => !prev);
            }}
            animate={{
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            className="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 normal-case font-normal"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-full max-w-md rounded-lg overflow-hidden bg-white flex flex-col items-center"
            >
              <div className="pt-6 px-4 text-center">
                <h1 className="text-2xl font-bold text-black">
                  Create a channel
                </h1>
                <h4 className="text-black-subtitle mt-2 text-base text-center">
                  Your channel is to segregate your server.
                </h4>
              </div>
              <form onSubmit={onSubmit} className="w-full relative">
                <div className="px-4 my-5">
                  <TextFormField
                    label="Channel name"
                    placeholder="My awesome Channel"
                    type="text"
                    required
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                  />
                </div>
                <div className="w-full text-black bg-white-hover bg-opacity-20 p-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setModalVisible(false);
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="text-white bg-primary text-md font-semibold px-4 rounded h-9"
                  >
                    <span className="mx-3">Create</span>
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewChannel;
