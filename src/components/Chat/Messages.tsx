import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../contexts/AppContext";
import { useCollection } from "react-firebase-hooks/firestore";
import { discordFirestore } from "../../firebase";
import ChatInput from "./ChatInput";
import dateAgo from "../../utils/dateAgo";

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
    <div className="h-full flex flex-col justify-between items-stretch pr-1">
      <div
        ref={messageScrollerRef}
        className="flex-1 custom-scroll overflow-y-scroll min-h-0 min-w-0 flex flex-col relative"
      >
        {snapshot?.docs.map((message) => {
          return (
            <div
              key={message.id}
              className="relative pl-20 pr-12 mt-4 mr-1 py-0.5 hover:bg-message-hover"
              style={{
                minHeight: "2.75rem",
              }}
            >
              <img
                className="w-10 h-10 rounded-full absolute left-6 top-1"
                alt={message.data().name}
                src={message.data().dp}
              />
              <h2 className="flex justify-start gap-2 items-baseline">
                <span className="font-medium text-base text-white">
                  {message.data().name}
                </span>
                <span className="text-xs text-white-muted">
                  {dateAgo(message.data().createdAt?.seconds)}
                </span>
              </h2>
              <p className="text-white-normal">{message.data().body}</p>
            </div>
          );
        })}
      </div>
      <ChatInput
        selectedChannel={selectedChannel}
        selectedServer={selectedServer}
      />
    </div>
  );
};

export default Messages;
