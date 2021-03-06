import { motion, AnimatePresence } from "framer-motion";
import { useState, ChangeEvent, FormEvent } from "react";
import { MdAdd } from "react-icons/md";
import { discordStorage, discordFirestore } from "../../firebase";
import TextFormField from "../shared/TextFormField";
import ServerItem from "./ServerItem";

const NewServer = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [serverName, setServerName] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let selected;
    if (e.target.files === null || e.target.files.length === 0) return;

    selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (file === null) return;
    const storageRef = discordStorage.ref(file.name + Date.now().toString());
    storageRef.put(file).then((snap) => {
      storageRef.getDownloadURL().then((url) => {
        discordFirestore.collection("servers").add({
          name: serverName,
          icon: url,
        }).then(() => {
          setModalVisible(false);
        })
      });
    });
  };

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
              opacity: 1,
            }}
            initial={{
              opacity: 0,
            }}
            className="fixed z-10 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90"
          >
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-full max-w-md rounded-lg overflow-hidden bg-white flex flex-col items-center"
            >
              <div className="pt-6 px-4 text-center">
                <h1 className="text-2xl font-bold text-black">
                  Create a server
                </h1>
                <h4 className="text-black-subtitle mt-2 text-base text-center">
                  Your server is where you and your friends hang out. Make yours
                  and start talking.
                </h4>
              </div>
              <form onSubmit={onSubmit} className="w-full relative">
                <img
                  className={`w-20 h-20 mt-8 mx-auto ${file && "rounded-full border-2 border-white-dark"}`}
                  src={file !== null ? URL.createObjectURL(file) : "/upload.png"}
                  alt="upload"
                />
                <input
                  onChange={handleChange}
                  type="file"
                  className="w-20 h-20 absolute top-8 opacity-0 left-1/2 transform -translate-x-1/2"
                />
                <div className="px-4 my-5">
                  <TextFormField
                    label="Server name"
                    placeholder="My awesome Guild"
                    type="text"
                    required
                    value={serverName}
                    onChange={(e) => setServerName(e.target.value)}
                  />
                </div>
                <div className="w-full bg-white-hover bg-opacity-20 p-4 flex items-center justify-between">
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

export default NewServer;
