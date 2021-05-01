import { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { AppContext } from "../../contexts/AppContext";
import { discordFirestore } from "../../firebase";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import ChannelItem from "./ChannelItem";

const ChannelsContainer = () => {
  const { selectedServer } = useContext(AppContext);

  return (
    <div className="bg-gray-dark w-60 flex flex-col justify-start items-stretch">
      {selectedServer && <ChannelsList selectedServer={selectedServer} />}
    </div>
  );
};

interface Props {
  selectedServer: QueryDocumentSnapshot;
}

const ChannelsList = ({ selectedServer }: Props) => {
  const [snapshot] = useCollection(
    discordFirestore
      .collection("servers")
      .doc(selectedServer?.id)
      .collection("channels")
  );
  const { changeChannel, selectedChannel } = useContext(AppContext);

  return (
    <>
      <div className="border-b-2 box-border border-gray-darkest h-12 flex justify-between items-center px-4 gap-1">
        <h4 className="text-white text-base leading-5 font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden">
          #{selectedServer?.data().name}
        </h4>
        {/* <FaChevronDown className="text-white-dark w-4 h-4" /> */}
      </div>
      <div className="pt-4">
        <h6 className="text-xs ml-2 mb-1 font-bold uppercase text-white-muted">
          Text channels
        </h6>
        <>
          {snapshot?.docs.map((channel, index) => {
            return (
              <ChannelItem
                onClick={() => {
                  changeChannel(channel);
                }}
                id={channel.id}
                name={channel.data().name}
                isSelected={channel.id === selectedChannel?.id}
              />
            );
          })}
        </>
      </div>
    </>
  );
};

export default ChannelsContainer;
