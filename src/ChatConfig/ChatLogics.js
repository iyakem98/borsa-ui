/* This page is simply a list of helper functions that I have wrote to make coding the app much simpler */

/* This function gets the sender in a given chat (from a user's perspective). It takes in the list of users (2) in the chat
and the id of the logged in user, compares them, and returns the name of the id that does not match to the logged in id (ie the 
  sender/other user's name)  */
  export const getSender = (loggedUser, users) => {
   
    return users[0]._id === loggedUser?._id ? users[1].firstName + " " + users[1].lastName : users[0].firstName + " " + users[0].lastName;
  };
  
/* This does exactly what the getSender function above does but instead of returning the name specifically, it just returns the id.
From here, we can attach any property of the user such as name, profilePic or location to retrieve it*/
  export const getSenderFull = (loggedUser, users) => {
    
    return users[0]._id === loggedUser._id ? users[1] : users[0];
  };

/* This function checks whether the message is from the same sender (ie sent consecutively from one person). We mainly use this to 
style our messages (eg: making sure the profile pic is displayed on the last message a user sent before the other one replied) */
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 && (messages[i+1].sender._id !== m.sender._id ||
      messages[i+1].sender._id === undefined) && messages[i].sender._id !== userId
  )
}

// this checks if a message is the last a user sent before the other one replied. Also mainly used for styling
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

// returns the margin for a message depending on who sent it. Makes it easier to style the messages.
export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 47;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

// Checks whether the next message is from the same user as the previous message.
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages?.data[i - 1]?.sender?._id === m.sender?._id;
};