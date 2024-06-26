import React, { useEffect, useRef } from "react";
import Message from "./Message.jsx";
import useGetMessages from "../../hooks/useGetMessages.js";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import useListenMessages from "../../hooks/useListenMessage.js";
const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages()
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView(true);
    }, 10);
  });

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages?.length > 0 &&
        messages.map((message) => (
          <div key={message?._id} ref={lastMessageRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages?.length === 0 && (
        <p>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
