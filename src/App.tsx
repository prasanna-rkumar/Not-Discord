import ChannelsContainer from "./components/Channels/ChannelContainer";
import ChatContainer from "./components/Chat/ChatContainer";
import ServerList from "./components/Servers/ServerList";
import TopNavbar from "./components/TopNavbar";
import { AppContextProvider } from "./contexts/AppContext";

function App() {
  return (
    <AppContextProvider>
      <div className="w-screen h-screen bg-gray-light flex flex-row justify-start items-stretch">
        <ServerList />
        <ChannelsContainer />
        <main className="flex-1 flex flex-col justify-start items-stretch overflow-hidden">
          <TopNavbar />
          <ChatContainer />
        </main>
      </div>
    </AppContextProvider>
  );
}

export default App;
