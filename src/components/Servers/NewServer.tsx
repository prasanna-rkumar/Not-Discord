import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import TextFormField from "../shared/TextFormField";
import ServerItem from "./ServerItem";

const NewServer = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <ServerItem
        onClick={() => {
          setModalVisible(true);
        }}
        isSelected={false}
      >
        <div className=" group-hover:shadow-lg transition-colors flex items-center justify-center w-full h-full bg-gray-light text-success group-hover:bg-success group-hover:text-white">
          <MdAdd size={24} />
        </div>
      </ServerItem>
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
              opacity: 0.9,
            }}
            initial={{
              opacity: 0,
            }}
            className="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center bg-black"
          >
            <div onClick={(e) => {
              e.stopPropagation();
            }} className="w-full max-w-md rounded-lg bg-white flex flex-col items-center">
              <h1 className=" text-2xl font-bold text-black">
                Create a server
              </h1>
              <h4 className="text-black-subtitle mt-2 text-lg text-center">
                Your server is where you and your friends hang out. Make yours
                and start talking.
              </h4>
              <form>
                <TextFormField
                  label="Server name"
                  placeholder="My awesome Cult"
                  type="text"
                  required
                  value=""
                  onChange={() => {}}
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewServer;
