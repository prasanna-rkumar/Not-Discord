import { useContext } from "react";
import { FiChevronDown } from "react-icons/fi";
import { AppContext } from "../../contexts/AppContext";
import ChannelsListContainer from "./ChannelsList";
import NewChannel from "./NewChannelForm";
import ServerTitle from "./ServerTitle";
import UserMenu from "./UserMenu";

const ChannelsContainer = () => {
  const { selectedServer, selectedChannel } = useContext(AppContext);
  return (
    <div
      className={`bg-gray lg:w-60 h-full flex flex-col justify-between items-stretch absolute w-full ${
        selectedChannel === undefined ? " right-0" : " -left-full"
      } lg:static`}
    >
      <ServerTitle />
      <div className="pt-4 flex-1 custom-scroll overflow-y-auto overflow-x-hidden">
        {selectedServer && (
          <h6 className="text-xs ml-2 mb-1 font-bold uppercase text-white-muted flex items-center justify-between pr-2 hover:text-white-dark">
            <span>
              <FiChevronDown className="inline" size={12} />
              Text channels
            </span>
            <NewChannel />
          </h6>
        )}
        <ChannelsListContainer />
      </div>
      <UserMenu />
    </div>
  );
};

export default ChannelsContainer;
