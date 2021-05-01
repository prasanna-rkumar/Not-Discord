import Messages from "./Messages";
import OnlineStatusList from "./OnlineStatusList";

const ChatContainer = () => {
  return (
    <div className="flex flex-row justify-start items-stretch w-full h-full">
      <Messages />
      <OnlineStatusList />
    </div>
  );
};

export default ChatContainer;
