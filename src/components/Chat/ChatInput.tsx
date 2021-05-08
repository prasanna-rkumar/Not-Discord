import { useState } from "react";
import {
  discordAuth,
  discordFirestore,
  firebaseTimestamp,
} from "../../firebase";
import { MdSend } from "react-icons/md";
import loginWithGoogle from "../../utils/loginWithGoogle";

interface Props {
  selectedServer: any;
  selectedChannel: any;
}

const ChatInput = ({ selectedServer, selectedChannel }: Props) => {
  const [message, setMessage] = useState("");

  return (
    <form
      style={{
        minWidth: 240,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!discordAuth.currentUser) {
          loginWithGoogle();
          return;
        }
        if (message.trim() === "") return;
        if (!selectedChannel && !selectedServer) return;
        discordFirestore
          .collection("servers")
          .doc(selectedServer?.id)
          .collection("channels")
          .doc(selectedChannel?.id)
          .collection("chat")
          .add({
            body: message.trim(),
            createdAt: firebaseTimestamp(),
            dp: discordAuth.currentUser?.photoURL,
            name: discordAuth.currentUser?.displayName,
            uid: discordAuth.currentUser?.uid,
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
        disabled={!selectedChannel || !selectedServer}
        style={{
          caretColor: "white",
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        className="w-full text-white-dark outline-none flex-1 rounded-lg bg-gray-lightest placeholder-white-muted h-11 pl-6 disabled:cursor-not-allowed"
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
