import { useContext, useEffect, useRef } from "react";
import { MdModeEdit, MdMoreHoriz } from "react-icons/md";
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

  const shouldRenderMessageHeading = (index: number): boolean => {
    const prevMessage = snapshot?.docs[index - 1];
    if (!!!prevMessage) return true;
    const prevMessageData = prevMessage.data();
    const currentMessageData = snapshot?.docs[index].data();

    if (currentMessageData?.createdAt === null) return false;

    if (
      dateAgo(prevMessageData.createdAt) ===
      dateAgo(currentMessageData?.createdAt)
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="h-full flex flex-col justify-between items-stretch">
      <div
        ref={messageScrollerRef}
        className="flex-1 custom-scroll overflow-x-hidden overflow-y-scroll min-h-0 min-w-0 flex flex-col relative mr-1"
      >
        <div className="h-4" key="top-margin"></div>
        {snapshot?.docs.map((message, index) => {
          const showMessageTitle = shouldRenderMessageHeading(index);
          const date = dateAgo(message.data().createdAt?.seconds);
          return (
            <div
              key={message.id}
              className={`relative pl-20 pr-12 pt-0.5 mr-1 group hover:bg-message-hover ${
                showMessageTitle && "mt-2"
              }`}
            >
              <div
                style={{
                  borderWidth: 1,
                }}
                className="text-white-muted focus-within:shadow-md justify-start absolute right-4 top-0 transform -translate-y-1/2 bg-gray-lightest border-gray-darkest rounded hidden group-hover:flex"
              >
                <button className="p-1 hover:text-white-dark outline-none">
                  <MdModeEdit size={20} />
                </button>
                <button className="p-1 hover:text-white-dark outline-none">
                  <MdMoreHoriz size={20} />
                </button>
              </div>

              {showMessageTitle ? (
                <>
                  <img
                    className="w-10 h-10 rounded-full absolute left-6 top-1"
                    alt={message.data().name}
                    src={`https://ui-avatars.com/api/?name=${
                      message.data().name
                    }&background=random`}
                  />
                  <h2 className="flex justify-start gap-2 items-baseline">
                    <span className="font-medium text-base text-white">
                      {message.data().name}
                    </span>
                    <span className="text-xs text-white-muted">{date}</span>
                  </h2>
                </>
              ) : (
                <div className="hidden group-hover:block absolute left-4 top-1.5 text-white-muted text-xxs">
                  {date.substring(date.indexOf(" "))}
                </div>
              )}

              <p className="text-white-normal leading-5 pb-1">
                {message.data().body}
              </p>
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
