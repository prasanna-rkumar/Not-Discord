import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { databaseTimestamp, discordAuth, discordDatabase } from "../firebase";

const isOfflineForDatabase = {
  state: "offline",
  last_changed: databaseTimestamp,
};

const isOnlineForDatabase = {
  state: "online",
  last_changed: databaseTimestamp,
};

const useOnlinePresende = () => {
  const [user] = useAuthState(discordAuth);

  useEffect(() => {
    if (!user || !user.uid) return;

    discordDatabase.ref(".info/connected").on("value", function (snapshot) {
      if (snapshot.val() === false) {
        return;
      }

      const userStatusDatabaseRef = discordDatabase.ref("/users/" + user.uid);

      userStatusDatabaseRef
        .onDisconnect()
        .update(isOfflineForDatabase)
        .then(function () {
          userStatusDatabaseRef.update(isOnlineForDatabase);
        });
    });
  }, [user]);

  return {};
};

export default useOnlinePresende;
