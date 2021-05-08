import dateAgo from "../../utils/dateAgo";
import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { useCallback, useState } from "react";
import EditMessage from "./EditMessage";
import { discordAuth } from "../../firebase";

interface Props {
  prevMessage: QueryDocumentSnapshot | undefined;
  currentMessage: QueryDocumentSnapshot;
}

const MessageItem = ({ prevMessage, currentMessage }: Props) => {
  const currentMessageData = currentMessage.data();

  const shouldRenderMessageHeading = useCallback((): boolean => {
    if (!!!prevMessage) return true;
    const prevMessageData = prevMessage.data();

    if (currentMessageData?.createdAt === null) return false;

    if (
      dateAgo(prevMessageData.createdAt) ===
      dateAgo(currentMessageData?.createdAt)
    ) {
      return false;
    }
    return true;
  }, [prevMessage, currentMessageData]);

  const showMessageTitle = shouldRenderMessageHeading();
  const date = dateAgo(currentMessageData.createdAt?.seconds);
  const [editing, setEditing] = useState(false);

  return (
    <div
      key={currentMessage.id}
      className={`relative pl-20 pr-12 pt-0.5 mr-1 group hover:bg-message-hover ${
        showMessageTitle && "mt-2"
      }`}
    >
      {discordAuth.currentUser?.uid === currentMessageData.uid && (
        <div
          style={{
            borderWidth: 1,
          }}
          className="text-white-muted focus-within:shadow-md justify-start absolute right-4 top-0 transform -translate-y-1/2 bg-gray-lightest border-gray-darkest rounded hidden group-hover:flex"
        >
          <button
            onClick={() => setEditing(true)}
            className="p-1 hover:text-white-dark outline-none"
          >
            <MdModeEdit size={20} />
          </button>
          <button
            onClick={() => currentMessage.ref.delete()}
            className="p-1 hover:text-white-dark outline-none"
          >
            <MdDelete size={20} />
          </button>
        </div>
      )}

      {showMessageTitle ? (
        <>
          <img
            className="w-10 h-10 rounded-full absolute left-6 top-1"
            alt={currentMessageData.name}
            src={`https://ui-avatars.com/api/?name=${currentMessageData.name}&background=random`}
          />
          <h2 className="flex justify-start gap-2 items-baseline">
            <span className="font-medium text-base text-white">
              {currentMessageData.name}
            </span>
            <span className="text-xs text-white-muted">{date}</span>
          </h2>
        </>
      ) : (
        <div className="hidden group-hover:block absolute left-4 top-1.5 text-white-muted text-xxs">
          {date.substring(date.indexOf(" "))}
        </div>
      )}

      {editing ? (
        <EditMessage
          selectedMessage={currentMessage}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <p className="text-white-normal leading-5 pb-1">
          {currentMessageData.body}
          {currentMessageData.edited && (
            <span className="text-xxs font-light text-white text-opacity-30">
              {" "}
              (edited)
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default MessageItem;
