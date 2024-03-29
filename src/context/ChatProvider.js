import React, { createContext, useContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(false);
  const [chatSelected, setchatSelected] = useState(false);
  const [notification, setNotification] = useState([]);
  const [fetchAgain, setfetchAgain] = useState(false);
  const [atChatScreen, setatChatScreen] = useState(true);
  const [sentMessage, setsentMessage] = useState(false);
  const [receivedMessage, setreceivedMessage] = useState(false);
  const [messageSentOrReceived, setmessageSentOrReceived] = useState(false);
  const [onlineStatus, setonlineStatus] = useState(false);
  const [chatRoute, setchatRoute] = useState("Chats");
  const [chats, setChats] = useState();
  const [triggerChange, settriggerChange] = useState(true);
  const [messageHeader, setmessageHeader] = useState(false);
  const [date, setDate] = useState(null);
  const [NewwMessage, setNewwMessage] = useState(false);
  const [chattId, setchattId] = useState();
  const [loading, setloading] = useState(false);
  const [searchTriggerChange, setsearchTriggerChange] = useState(false);
  const [searchFirstName, setsearchFirstName] = useState(undefined);
  const [searchIcon, setSearchIcon] = useState(undefined);
  const [activeToday, setactiveToday] = useState(false);
  const [checkContent, setcheckContent] = useState(false);
  const [TtriggerChange, setTtriggerChange] = useState(false);
  const [YtriggerChange, setYtriggerChange] = useState(false);
  const [OtriggerChange, setOtriggerChange] = useState(false);
  const [travelerFilterOn, setTravelerFilterOn] = useState(false);
  const [travelerFilter, setTravelerFilter] = useState(false);
  const [buyerFilterOn, setBuyerFilterOn] = useState(false);
  const [buyerFilter, setBuyerFilter] = useState(false);
  const [travelerFilterPickup, setTravelerFilterPickup] = useState("");
  const [travelerFilterDestination, setTravelerFilterDestination] =
    useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        setmessageHeader,
        date,
        setDate,
        NewwMessage,
        setNewwMessage,
        chattId,
        setchattId,
        loading,
        setloading,
        checkContent,
        setcheckContent,
        TtriggerChange,
        setTtriggerChange,
        YtriggerChange,
        setYtriggerChange,
        OtriggerChange,
        setOtriggerChange,
        activeToday,
        setactiveToday,
        searchTriggerChange,
        setsearchTriggerChange,
        searchFirstName,
        setsearchFirstName,
        travelerFilterOn,
        setTravelerFilterOn,
        travelerFilter,
        setTravelerFilter,
        buyerFilter,
        setBuyerFilter,
        buyerFilterOn,
        setBuyerFilterOn,
        travelerFilterPickup,
        setTravelerFilterPickup,
        travelerFilterDestination,
        setTravelerFilterDestination,
        isLoading,
        setIsLoading,
        searchIcon,
        setSearchIcon,
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
