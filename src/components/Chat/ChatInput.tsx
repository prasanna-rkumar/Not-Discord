import { useState } from "react";
import { discordFirestore, firebaseTimestamp } from "../../firebase";
import { MdSend } from "react-icons/md";

interface Props {
  selectedServer: any;
  selectedChannel: any;
};

const ChatInput = ({ selectedServer, selectedChannel }: Props) => {
  const [message, setMessage] = useState("");

  return (
    <form
      style={{
        minWidth: 240,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        discordFirestore
          .collection("servers")
          .doc(selectedServer?.id)
          .collection("channels")
          .doc(selectedChannel?.id)
          .collection("chat")
          .add({
            body: message,
            createdAt: firebaseTimestamp(),
            dp:
              "https://cdn.discordapp.com/avatars/441263263947423754/ba5e779d3adb7b0844b856e60398e6ed.png?size=128",
            name: "Prasanna Kumar",
            uid: "1qw23er45ty67ui8",
          })
          .then((e) => {
          })
          .catch((error) => {
            console.log(error);
          })
          .finally(() => {
            setMessage("");
          });
      }}
      className="h-16 pb-1 px-4 flex justify-between items-center relative"
    >
      <input
        style={{
          caretColor: "white",
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        className="w-full text-white-dark outline-none flex-1 rounded-lg bg-gray-lightest placeholder-white-muted h-11 pl-6"
        placeholder={`Message #${selectedChannel?.data().name}`}
      />
      <button>
        <MdSend
          size={20}
          className="transform -translate-y-1/2 text-white-dark absolute top-1/2 right-8"
        />
      </button>
    </form>
  );
};

export default ChatInput;
