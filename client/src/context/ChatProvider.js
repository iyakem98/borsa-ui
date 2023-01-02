import React, { createContext, useContext,  useState } from "react";


const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(false);
  const [chatSelected, setchatSelected] = useState(false);
  const [notification, setNotification] = useState([]);
  const [fetchAgain, setfetchAgain] = useState(false)
  const [atChatScreen, setatChatScreen] = useState(true)
 
  const [chats, setChats] = useState();


  

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
        setatChatScreen
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