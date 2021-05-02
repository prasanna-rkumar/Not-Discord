import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/AppContext";
import { MdSend } from "react-icons/md";
import { useCollection } from "react-firebase-hooks/firestore";
import { discordFirestore } from "../../firebase";

const Messages = () => {
  const { selectedServer, selectedChannel } = useContext(AppContext);
  const [snapshot] = useCollection(
    discordFirestore
      .collection("servers")
      .doc(selectedServer?.id)
      .collection("channels")
      .doc(selectedChannel?.id)
      .collection("chat")
  );
  useEffect(() => {
    console.log('opened')
    return (() => {
      console.log('closed')
      discordFirestore.collection("users").doc("CbPIkA8BTK17xBBzouoh").update({
        isOnline: false,
      })
    });
  }, []);
  return (
    <div className="flex-1 bg-gray-light min-w-0 overflow-hidden">
      <div className="h-full flex flex-col justify-between items-stretch">
        <div className="flex-1 min-h-0 min-w-0 flex flex-col relative">
          {snapshot?.docs.map((message) => (
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
                <span className="text-xs text-white-muted">{message.data().createdAt.seconds}</span>
              </h2>
              <p className="text-white-normal">
                {message.data().body}
              </p>
            </div>
          ))}
        </div>
        <form
          style={{
            minWidth: 240,
          }}
          className="h-16 pb-1 px-4 flex justify-between items-center relative"
        >
          <input
            style={{
              caretColor: "white",
            }}
            className="w-full outline-none flex-1 rounded-lg bg-gray-lightest placeholder-white-muted h-11 pl-6"
            placeholder={`Message #${selectedChannel?.data().name}`}
          />
          <button>
            <MdSend
              size={20}
              className="transform -translate-y-1/2 text-white-dark absolute top-1/2 right-8"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Messages;
