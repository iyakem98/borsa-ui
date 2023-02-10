import asyncHandler from 'express-async-handler'
import { Img } from '../models/ImageModel.js';


export const addImg = asyncHandler(async(req, res) => {
  
  const image = req.file.filename;
  // const image = req.body;
  // console.log(image)

    
  try{
    const img = await Img.create({
      image,
   });
   res.status(200).json({success: "image added succesfully", photo: img})
  }
  catch(err){
    res.status(400).json({Error: err})
  }
      
      
    
      
      
    
    
    //  return  res.status(400).json({message: err})
    //   // console.log("cannot delete chat")
    // }
    // console.log(chatID)
    // console.log(`chat deleted sucessfully with ID ${chatID.chatID}`)
   
   })
export const delImg = asyncHandler(async(req, res) => {
  
  // const image = req.file.filename;
  const imageID = req.body;
  

    
  try{
    const img = await Img.findByIdAndDelete(imageID.imageID);
   res.status(200).json({success: "image deleted succesfully"})
  }
  catch(err){
    res.status(400).json({Error: err})
  }
      
      
    
      
      
    
    
    //  return  res.status(400).json({message: err})
    //   // console.log("cannot delete chat")
    // }
    // console.log(chatID)
    // console.log(`chat deleted sucessfully with ID ${chatID.chatID}`)
   
   })
export const getImg = asyncHandler(async(req, res) => {
  
  // const image = req.file.filename;
  

    
  try{
    const img = await Img.find();
    console.log(img)
    res.status(200).json(img)
  //  res.status(200).json({success: "image retrieved succesfully", photo: img})
  }
  catch(err){
    res.status(400).json({Error: err})
  }
      
      
    
      
      
    
    
    //  return  res.status(400).json({message: err})
    //   // console.log("cannot delete chat")
    // }
    // console.log(chatID)
    // console.log(`chat deleted sucessfully with ID ${chatID.chatID}`)
   
   })

 