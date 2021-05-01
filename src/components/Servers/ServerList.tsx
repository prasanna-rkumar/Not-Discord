import { useContext } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { AppContext } from "../../contexts/AppContext";
import { discordFirestore } from "../../firebase";

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
            const { name, icon } = server.data();
            return (
              <ServerItem
                onClick={() => {
                  changeServer(server)
                }}
                isSelected={server.id === selectedServer?.id}
                name={name}
                icon={icon}
                id={server.id}
                key={server.id}
              />
            );
          })}
        </>
      </div>
    </div>
  );
};

interface Props {
  name: string;
  icon: string;
  id: string;
  isSelected: boolean;
  onClick: () => void;
}

const ServerItem = ({ name, icon, isSelected, onClick }: Props) => {
  return (
    <div onClick={onClick} className="w-full flex justify-center mb-2 cursor-pointer relative group">
      <div className={`transform transition absolute w-2 h-5 rounded -left-1 bg-white top-1/2 -translate-y-1/2 ${isSelected ? "scale-y-150" : "scale-y-50 group-hover:scale-y-100"}`}></div>
      <img
        className={`w-12 h-12 object-cover ${isSelected ? "rounded-xl" : "rounded-full hover:rounded-xl"}`}
        src={icon}
        alt="Not Discord"
      />
    </div>
  );
};

export default ServerList;
