import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { FormEvent, useEffect, useRef, useState } from "react";
import { firebaseTimestamp } from "../../firebase";

interface Props {
  selectedMessage: QueryDocumentSnapshot | undefined;
  onCancel: () => void;
}

const EditMessage = ({ onCancel, selectedMessage }: Props) => {
  const [message, setMessage] = useState(selectedMessage?.data().body);
  const messageRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onCancel();
      }
    };

    messageRef.current?.focus();

    window.addEventListener("keydown", listener);

    return () => window.removeEventListener("keydown", listener);
  }, [onCancel]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onCancel();
    if (message.trim() === "") {
      selectedMessage?.ref.delete();
      return;
    }
    if (selectedMessage?.data().body === message.trim()) return;
    selectedMessage?.ref.update({
      body: message.trim(),
      updatedAt: firebaseTimestamp(),
      edited: true,
    });
  };

  return (
    <form onSubmit={onSubmit} className="my-2">
      <input
        ref={messageRef}
        className="w-full text-mobile-paragraph text-white-normal rounded-xl px-4 py-2.5 bg-gray-lightest outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="text-xs pt-1.5 text-white text-opacity-50">
        escape to{" "}
        <span
          className="text-primary cursor-pointer hover:underline"
          onClick={() => onCancel()}
        >
          cancel
        </span>{" "}
        • enter to{" "}
        <button
          type="submit"
          className="text-primary bg-transparent outline-none hover:underline"
        >
          save
        </button>
      </div>
    </form>
  );
};

export default EditMessage;
