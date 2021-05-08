import { useRef, useState } from "react";
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
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = () => {
    if (!discordAuth.currentUser) {
      loginWithGoogle();
      return;
    }
    if (message.trim() === "") return;
    if (!selectedChannel && !selectedServer) return;
    setMessage("");
    if (messageRef.current !== null) messageRef.current.style.height = "40px";
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
      });
  };

  return (
    <form
      style={{
        minWidth: 240,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        sendMessage();
      }}
      className="pb-1 h-auto mb-3 lg:mb-6 px-4 flex justify-between items-center relative"
    >
      <textarea
        onKeyUp={(e) => {
          console.log(e);
          if (e.code === "Enter") {
            sendMessage();
            return;
          }
          if (messageRef.current !== null) {
            if (messageRef.current.scrollHeight <= 48) {
              messageRef.current.style.height = "40px";
              return;
            }
            if (messageRef.current.scrollHeight >= 350) return;
            messageRef.current.style.height = "24px";
            messageRef.current.style.height =
              messageRef.current.scrollHeight + "px";
          }
        }}
        ref={messageRef}
        disabled={!selectedChannel || !selectedServer}
        style={{
          caretColor: "white",
        }}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        className="w-full h-10 py-2 box-border resize-none text-mobile-paragraph lg:text-base text-white-dark outline-none rounded-lg bg-gray-lightest placeholder-white-muted custom-scroll pl-6 disabled:cursor-not-allowed"
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
