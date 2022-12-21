import Chat from '../models/chatModel.js'
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js';
import users from '../data/users.js';

/*const accessChat = asyncHandler(async(req, res) => {

    const { userId } = await req.body;
    console.log('access phase 1')

  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "firstName profilePic email isTraveler",
  });

  console.log('access phase 2')

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    console.log('access phase 3')

    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      console.log('access phase 4')
      res.status(200).json(FullChat);
    } catch (error) {
      console.log('bro this an access phase error')
      res.status(400);
      throw new Error(error.message);
    }
  }
    
}); */

const accessChat = asyncHandler(async(req, res) => {

  const { userId } = await req.body;
  console.log('access phase 1')

if (!userId) {
  console.log("UserId param not sent with request");
  return res.sendStatus(400);
}

var isChat = await Chat.find({
  isGroupChat: false,
  $and: [
    { users: { $elemMatch: { $eq: req.user._id } } },
    { users: { $elemMatch: { $eq: userId } } },
  ],
})
  .populate("users", "-password")
  .populate("latestMessage");

isChat = await User.populate(isChat, {
  path: "latestMessage.sender",
  select: "firstName profilePic email isTraveler",
});

console.log('access phase 2')

if (isChat.length > 0) {
  res.send(isChat[0]);
} else {
  var chatData = {
    chatName: "sender",
    isGroupChat: false,
    users: [req.user._id, userId],
  };

  console.log('access phase 3')

  try {
    const createdChat = await Chat.create(chatData);
    const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
      "users",
      "-password"
    );
    console.log('access phase 4')
    res.status(200).json(FullChat);
  } catch (error) {
    console.log('bro this an access phase error')
    res.status(400);
    throw new Error(error.message);
  }
}
  
});


const fetchChats = asyncHandler(async(req, res) => {
    try {
        Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
            .populate("users", "-password")
            .populate("latestMessage")
                .sort({updatedAt: -1})
                .then(async(results)=> {
                    results = await User.populate(results, {
                        path: "latestMessage.sender",
                        select: "firstName profilePic email isTraveler"
                    })
                    console.log(`we fetching on ${req.user._id}`)
                    res.status(200).send(results)
                })
        
    } catch (error) {
        res.status(400)
        throw new Error(error.message);
    }
})

const tryChats = asyncHandler(async(req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const t = req.body.text

  console.log(`this is in the backend bro ${t}`)

  res.status(200).json(t)
})
export{accessChat, fetchChats, tryChats}


/*
const {userId} = req.body

    if (!userId){
        console('UserId param not sent with request')
        return res.sendStatus(400)
    }

    var isChat = await Chat.find({
        $and: [
            {users:{$elemMatch:{$eq:req.user._id}}},
            {users:{$elemMatch:{$eq:req.userId}}}
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "firstName profilePic email isTraveler"
    })

    if (isChat.length > 0){
        res.send(isChat[0])
    } else {
        var chatData = {
            chatName: "sender",
            users: [req.user._id, userId]
        };
    

    try {
        const createdChat = await Chat.create(chatData)

        const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password")

        res.status(200).send(FullChat);

    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
    } 

*/
