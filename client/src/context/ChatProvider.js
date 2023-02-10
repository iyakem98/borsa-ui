import React, { createContext, useContext,  useState } from "react";


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(false);
  const [chatSelected, setchatSelected] = useState(false);
  const [notification, setNotification] = useState([]);
  const [fetchAgain, setfetchAgain] = useState(false)
  const [atChatScreen, setatChatScreen] = useState(true)
  const [sentMessage, setsentMessage] = useState(false)
  const [receivedMessage, setreceivedMessage] = useState(false)
  const [messageSentOrReceived, setmessageSentOrReceived] = useState(false)
  const [onlineStatus, setonlineStatus] = useState(false)
  const [chatRoute, setchatRoute] = useState("Chats")
  const [chats, setChats] = useState();
  const [triggerChange, settriggerChange] = useState(true);
  const [messageHeader, setmessageHeader] = useState(false);


  

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        chatSelected,
        setchatSelected,
        notification,
        setNotification,
        fetchAgain,
        setfetchAgain,
        chats,
        setChats,
        atChatScreen,
        setatChatScreen,
        sentMessage,
        setsentMessage,
        receivedMessage,
        setreceivedMessage,
        messageSentOrReceived,
        setmessageSentOrReceived,
        onlineStatus,
        setonlineStatus,
        chatRoute, 
        setchatRoute,
        triggerChange, 
        settriggerChange,
        messageHeader, 
        setmessageHeader

      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;