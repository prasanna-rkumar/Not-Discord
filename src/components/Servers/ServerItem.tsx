import { FC } from "react";

interface Props {
  icon?: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const ServerItem: FC<Props> = ({ icon, isSelected, onClick, children }) => {
  return (
    <div
      onClick={onClick}
      className="w-full flex justify-center mb-2 cursor-pointer relative group"
    >
      <div
        className={`transform transition absolute w-2 h-5 rounded -left-1 bg-white top-1/2 -translate-y-1/2 ${
          isSelected ? "scale-y-150" : "scale-y-50 group-hover:scale-y-100"
        }`}
      ></div>
      <div
        className={`overflow-hidden w-12 h-12 ${
          isSelected ? "rounded-xl" : "rounded-full hover:rounded-xl"
        }`}
      >
        {icon ? (
          <img
            className="w-12 h-12 object-cover"
            src={icon}
            alt="Not Discord"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default ServerItem
