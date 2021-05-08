import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { discordFirestore } from "../../firebase";
import ChatInput from "./ChatInput";
import MessageItem from "./MessageItem";

const Messages = () => {
  const { selectedServer, selectedChannel } = useContext(AppContext);
  const messageScrollerRef = useRef<HTMLDivElement>(null);
  const [snapshot] = useCollection(
    discordFirestore
      .collection("servers")
      .doc(selectedServer?.id)
      .collection("channels")
      .doc(selectedChannel?.id)
      .collection("chat")
      .orderBy("createdAt", "asc")
  );

  useEffect(() => {
    if (messageScrollerRef) {
      messageScrollerRef.current?.addEventListener(
        "DOMNodeInserted",
        (event) => {
          messageScrollerRef.current?.scroll({
            top: messageScrollerRef.current?.scrollHeight,
          });
        }
      );
    }
  }, []);

  return (
    <div className="h-full flex flex-col justify-between items-stretch">
      <div
        ref={messageScrollerRef}
        className="flex-1 custom-scroll overflow-x-hidden overflow-y-scroll min-h-0 min-w-0 flex flex-col relative mr-1"
      >
        <div className="" key="top-margin">
          <div className="h-4"></div>
        </div>
        {snapshot?.docs.map((currentMessage, index) => (
          <MessageItem
            key={currentMessage.id}
            currentMessage={currentMessage}
            prevMessage={snapshot.docs[index - 1]}
          />
        ))}
        <div className="" key="bottom-margin">
          <div className="h-4"></div>
        </div>
      </div>
      <ChatInput
        selectedChannel={selectedChannel}
        selectedServer={selectedServer}
      />
    </div>
  );
};

export default Messages;
