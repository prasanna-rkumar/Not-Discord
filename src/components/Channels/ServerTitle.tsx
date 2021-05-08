import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const ServerTitle = () => {
  const { selectedServer } = useContext(AppContext);

  return (
    <div className="border-b-2 box-border border-gray-darkest h-12 flex justify-between items-center px-4 gap-1">
      <h4 className="text-white text-base leading-5 font-semibold whitespace-nowrap overflow-ellipsis overflow-hidden">
        {selectedServer?.data().name}
      </h4>
    </div>
  );
};

export default ServerTitle;
