/* eslint-disable react/prop-types */
import { extractTime } from "../../../inbox/utils/extractTime";
import useConversation from "../../../inbox/zustand/useConversation";

const Message = ({ message }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === user._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe ? user.photo : selectedConversation?.photo;

  return (
    <div className="w-full">
      {chatClassName === "chat-start" ? (
        <div className="grid pb-2">
          <div className="flex gap-2.5 ">
            <img
              src={`/images/${profilePic}`}
              alt="Other"
              className="w-10 h-11 rounded-full"
            />
            <div className="grid">
              <div className="w-max grid">
                <div className="px-3.5 py-2 bg-gray-100 rounded justify-start  items-center gap-3 inline-flex">
                  <h5 className="text-gray-900 text-sm font-normal leading-snug">
                    {message.message}
                  </h5>
                </div>
                <div className="justify-end items-center inline-flex mb-2.5">
                  <h6 className="text-white-500 text-xs font-normal leading-4 py-1">
                    {formattedTime}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex gap-2.5 justify-end pb-2">
          <div className="">
            <div className="grid mb-2">
              <div className="px-3 py-2 bg-indigo-600 rounded">
                <h2 className="text-white text-sm font-normal leading-snug">
                  {message.message}
                </h2>
              </div>
              <div className="justify-start items-center inline-flex">
                <h3 className="text-white-500 text-xs font-normal leading-4 py-1">
                  {formattedTime}
                </h3>
              </div>
            </div>
          </div>
          <img
            src={`/images/${profilePic}`}
            alt="Me"
            className="w-10 h-11 rounded-full"
          />
        </div>
      )}
    </div>
  );
};
export default Message;
