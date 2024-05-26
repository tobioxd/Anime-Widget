import Sidebar from "../components/inbox/sidebar/Sidebar";
import MessageContainer from "../components/inbox/messages/MessageContainer";
import background from "../assets/background/6.jpg";

const Inbox = () => {
  return (
    <div className="h-screen bg-center bg-no-repeat flex flex-col items-center "style={{ 
      backgroundImage: `url(${background})`,
      backgroundSize: '100% 100%', 
      backgroundRepeat: 'no-repeat', 
      backgroundPosition: 'center',
      height: 'calc(100vh - 70px)'
    }}>
      <div className="flex mt-40 sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </div>
  );
};

export default Inbox;
