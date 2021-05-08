import { useContext, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { AppContext } from "../../contexts/AppContext";
import { discordFirestore } from "../../firebase";
import ChannelItem from "./ChannelItem";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";

const ChannelsListContainer = () => {
  const { selectedServer } = useContext(AppContext);
  return (
    <>{selectedServer && <ChannelsList selectedServer={selectedServer} />}</>
  );
};

export default ChannelsListContainer;

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

  /* useEffect(() => {
    if (snapshot?.docs && snapshot.docs.length > 0 && selectedChannel === undefined)
      changeChannel(snapshot.docs[0]);
  }, [snapshot, changeChannel, selectedChannel]); */

  return (
    <>
      {snapshot?.docs.map((channel) => {
        return (
          <ChannelItem
            onClick={() => {
              changeChannel(channel);
            }}
            key={channel.id}
            name={channel.data().name}
            isSelected={channel.id === selectedChannel?.id}
          />
        );
      })}
    </>
  );
};
