import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import Messages from "./Messages";
import OnlineStatusList from "./OnlineStatusList";

const ChatContainer = () => {
  const { selectedChannel } = useContext(AppContext);
  return (
    <div className="flex flex-row justify-start items-stretch w-full h-full">
      {selectedChannel && <Messages />}
      <OnlineStatusList />
    </div>
  );
};

export default ChatContainer;
