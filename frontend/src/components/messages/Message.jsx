import React from "react";

const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src="https://avatar.iran.liara.run/public" />
        </div>
      </div>
      <div className="chat-bubble text-white bg-blue-500  min-h-auto">
        It was said that you would, destroy the Sith, not join them.
      </div>
      <div className="chat-footer  text-white opacity-50 text-xs flex gap-1">
        12:12
      </div>
    </div>
  );
};

export default Message;
