interface Props {
  profilePicture: string;
  fullname: string;
  state: string;
}

const OnlineStatusItem = ({ profilePicture, fullname, state }: Props) => {
  console.log(state);
  return (
    <div className="flex flex-row cursor-pointer justify-start items-center py-2 hover:bg-gray-light px-2 overflow-hidden rounded">
      <div className="relative">
        <img
          className="h-8 w-8 rounded-full inline mr-2"
          alt="dp"
          src={
            profilePicture ??
            "https://discord.com/assets/dd4dbc0016779df1378e7812eabaa04d.png"
          }
        />
        <div className={`absolute right-2 -bottom-0.5 w-3 h-3 border-2 border-gray-darkest rounded-full ${state === "online" ? "bg-success" : " bg-white-muted"}`}>

        </div>
      </div>
      <span className="text-white font-medium text-base overflow-hidden overflow-ellipsis whitespace-nowrap">
        {fullname}
      </span>
    </div>
  );
};

export default OnlineStatusItem;
