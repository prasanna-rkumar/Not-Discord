import { createContext, FC, useState } from "react";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";

interface Props {
  selectedServer: QueryDocumentSnapshot | undefined;
  changeServer: (server?: QueryDocumentSnapshot | undefined) => void;
  selectedChannel: QueryDocumentSnapshot | undefined;
  changeChannel: (server: QueryDocumentSnapshot) => void;
}

export const AppContext = createContext<Props>({
  selectedServer: undefined,
  changeServer: () => {},
  selectedChannel: undefined,
  changeChannel: () => {},
});

export const AppContextProvider: FC = ({ children }) => {
  const [selectedServer, setSelectedServer] = useState<
    QueryDocumentSnapshot | undefined
  >();
  const [selectedChannel, setSelectedChannel] = useState<
    QueryDocumentSnapshot | undefined
  >();

  const changeServer = (server?: QueryDocumentSnapshot | undefined) => {
    setSelectedServer(server);
    setSelectedChannel(undefined);
  };

  const changeChannel = (channel: QueryDocumentSnapshot) => {
    if (channel.id === selectedServer?.id) return;
    setSelectedChannel(channel);
  };

  return (
    <AppContext.Provider
      value={{
        selectedServer,
        changeServer,
        selectedChannel,
        changeChannel,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
