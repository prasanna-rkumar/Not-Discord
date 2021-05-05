import { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { AppContext } from "../../contexts/AppContext";
import { discordFirestore } from "../../firebase";
import NewServer from "./NewServer";
import ServerItem from "./ServerItem";

const ServerList = () => {
  const [snapshot] = useCollection(discordFirestore.collection("servers"));
  const { changeServer, selectedServer } = useContext(AppContext);
  return (
    <div className="bg-gray-darkest">
      <div className="w-16 py-2">
        <img
          className="mx-auto"
          src="/discord.png"
          width={36}
          height={36}
          alt="Not Discord"
        />
        <div className="mx-auto bg-gray-lightest h-0.5 w-8 my-2 rounded-full" />
        <>
          {snapshot?.docs.map((server) => {
            const { icon } = server.data();
            return (
              <ServerItem
                onClick={() => {
                  changeServer(server);
                }}
                isSelected={server.id === selectedServer?.id}
                icon={icon}
                key={server.id}
              />
            );
          })}
          <NewServer />
        </>
      </div>
    </div>
  );
};

export default ServerList;
