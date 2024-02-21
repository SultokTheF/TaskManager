import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import "./Chat.css";
import io from "socket.io-client";

import useUserData from "../../../../hooks/useUserData";
import { ChatEndpoints } from "../../../../constants/endpoints";
import avatar from "../../../../constants/profile_image";

const Chat: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const userData = useUserData();
  const messagesRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");

  useEffect(() => {
    const socket = io(ChatEndpoints.chat);

    socket.on("chatMessage", (message: any) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("loadMessages", (loadedMessages: any) => {
      setMessages(loadedMessages);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Scroll to the bottom when messages update
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const isOwnMessage = (sender: string | undefined) => {
    return sender === userData?._id;
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (inputMessage.trim() !== "") {
      const newMessage = {
        sender: userData?._id,
        message: inputMessage,
        project: id,
        username: userData?.username,
        profileImage: userData?.profile_image
      };

      const socket = io(ChatEndpoints.chat);
      socket.emit("chatMessage", newMessage);

      setInputMessage("");
    }
  };

  return (
    <>
      <div className="chat">
        <div className="chat-msg" ref={messagesRef}>
        {messages
          .filter(message => message.project === id)
          .map((message, index) => (
            <div className="bubbleWrapper" key={index}>
              <div
                className={`inlineContainer ${
                  isOwnMessage(message.sender) ? "own" : "other"
                }`}
              >
                <a href={`user/profile/${message.sender}`}>
                  <img
                    className="inlineIcon"
                    src={avatar[message.profileImage]}
                    alt={`icon-${index}`}
                  />
                </a>
                <div
                  className={`${isOwnMessage(message.sender) ? "own" : "other"}Bubble`}
                >
                  {message.message}
                </div>
              </div>
              <span className={isOwnMessage(message.sender) ? "own info" : "other info"}>
                {message.username}: {message.timestamp}
              </span>
            </div>
          ))
        }
        </div>

        {localStorage.getItem("accessToken") ? (
          <>
            <form className="msger-inputarea" onSubmit={handleSendMessage}>
              <input
                type="text"
                className="msger-input"
                placeholder="Enter your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button className="btn" type="submit">Send</button>
            </form>
          </>
        ) : (
          <>
            <form className="msger-inputarea">
              <input
                type="text"
                className="msger-input"
                placeholder="Authorize first"
              />
            </form>
          </>
        )}
      </div>
    </>
  );
};

export default Chat;
