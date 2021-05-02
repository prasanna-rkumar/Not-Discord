import { FaHashtag } from "react-icons/fa";

interface Props {
  name: string;
  isSelected: boolean;
  onClick: () => void;
}

const ChannelItem = ({ name, isSelected, onClick }: Props) => {
  return (
    <div onClick={onClick} className={`flex cursor-pointer mb-0.5 rounded-md group justify-between items-center mx-2 px-2 h-9 gap-2 text-white-muted ${isSelected ? " bg-gray-lightest" : "hover:bg-gray"}`}>
      <FaHashtag className=" w-5 h-5" />
      <p className={`w-full text-base font-medium ${isSelected ? "text-white" : "group-hover:text-white-hover" }`}>{name}</p>
    </div>
  );
};

export default ChannelItem;
