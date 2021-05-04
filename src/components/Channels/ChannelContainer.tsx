import ChannelsListContainer from "./ChannelsList";
import ServerTitle from "./ServerTitle";
import UserMenu from "./UserMenu";

const ChannelsContainer = () => {
  return (
    <div className="bg-gray w-60 flex flex-col justify-between items-stretch">
      <ServerTitle />
      <div className="pt-4 flex-1 custom-scroll overflow-y-auto overflow-x-hidden">
        <h6 className="text-xs ml-2 mb-1 font-bold uppercase text-white-muted">
          Text channels
        </h6>
        <ChannelsListContainer />
      </div>
      <UserMenu />
    </div>
  );
};

export default ChannelsContainer;
