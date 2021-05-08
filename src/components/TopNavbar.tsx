import { useContext } from "react";
import { BiHash } from "react-icons/bi";
import { AppContext } from "../contexts/AppContext";

const TopNavbar = () => {
  const { selectedChannel } = useContext(AppContext);
  return (
    <nav className="h-12 box-content w-full border-b-2 border-gray-darkest flex items-center px-4">
      {selectedChannel && (
        <>
          <BiHash size="24" className=" text-white-muted mr-2" />
          <span className="text-white font-semibold">{selectedChannel.data().name}</span>
        </>
      )}
    </nav>
  );
};

export default TopNavbar;
