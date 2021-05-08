import { useList } from "react-firebase-hooks/database";
import { discordDatabase } from "../../firebase";
import OnlineStatusItem from "./OnlineStatusItem";

const OnlineStatusList = () => {
  const [snapshot] = useList(discordDatabase.ref("users"));

  return (
    <div className=" hidden  w-60 bg-gray lg:flex flex-col justify-start items-stretch gap-0.5 px-1 pt-6">
      {snapshot?.map((user) => (
        <OnlineStatusItem
          key={user.key}
          profilePicture={user.val().profile_picture}
          fullname={user.val().fullname}
          state={user.val().state}
        />
      ))}
    </div>
  );
};

export default OnlineStatusList;
