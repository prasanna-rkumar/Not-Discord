import { useList } from "react-firebase-hooks/database";
import { discordDatabase } from "../../firebase";
import OnlineStatusItem from "./OnlineStatusItem";

const OnlineStatusList = () => {
  const [snapshot] = useList(discordDatabase.ref("users"));

  return (
    <div style={{height: "calc(100vh - 48px)"}} className="hidden custom-scroll w-60 bg-gray lg:block overflow-y-auto px-1 pt-6">
      {snapshot?.map((user) => (
        <OnlineStatusItem
          key={user.key}
          profilePicture={user.val().profile_picture}
          fullname={user.val().fullname}
          state={user.val().state}
        />
      ))}
      <div className="h-12"></div>
    </div>
  );
};

export default OnlineStatusList;
