import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {Camera} from "expo-camera"
import * as MediaLibrary from "expo-media-library"
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

function Test2() {
    const [hasPermissions, sethasPermissions] = useState(null)
    const [hasMediaLibPermissions, setMediaLibPermissions] = useState()
    const [image, setImage] = useState(null)
    const [getPics, setgetPics] = useState([])
    const [cameraOnOff, setcameraOnOff] = useState(true)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
    const [toggleCamera, settoggleCamera] = useState(true)
    const publicFolder = "http://192.168.100.2:5000/images/"
    const cameraRef = useRef()
   
    useEffect(() => {
      testCamera()
     
    }, [])
  
    // console.log(getPics)
    // console.log(image)
   
    const saveImg = async () => {
      let options = {
        quality: 1,
        base64: false,
        // exif: true,
        storageOptions: {
          skipBackup: true,
          path: 'images'
         }
      };
      const formData = new FormData()
     
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      let filename = newPhoto.uri.split('/').pop();
      console.log(filename)
      // console.log(newPhoto)
      // // console.log(data:image/jpg + base64newPhoto.base64)
      formData.append('image', {
        name: filename,
        uri: newPhoto.uri ,
        type: 'image/jpg',
      });
     
      // console.log(newPhoto.data)
      // const data = await axios.post("http://192.168.100.2:5000/api/images/addImg", newPhoto.uri)
      // setImage(newPhoto);
    //  console.log(formData)
      try{
        const config = {
          
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          // body: JSON.stringify({
          //   imgsource: newPhoto.base64,
          // }),
          // body: formData
         };
      const data = await axios.post("http://192.168.100.2:5000/api/images/addImg",formData, config)
      //   headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      console.log('image saved successfully')
      // const data = await axios.get("http://192.168.100.2:5000/api/images/getImg")
      //   console.log(data)
      // console.log('image retrieved successfully')

    }
    
      
    catch (error) {
      console.log(error);
    }

    }
    const testCamera = async () =>{
        const mediaPermissions = await MediaLibrary.requestPermissionsAsync()
        const cameraStatus = await Camera.requestCameraPermissionsAsync()
        sethasPermissions(cameraStatus.status === 'granted')
        setMediaLibPermissions(mediaPermissions.status === 'granted')
       }
       let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    console.log(newPhoto.uri)
    setImage(newPhoto);
  };
  const getImgs = async() => {
    // console.log("try")
    try{
      const {data} = await  axios.get("http://192.168.100.2:5000/api/images/retrieveImg")
      setgetPics(data)
      // console.log(data)
    }
    catch(err){
      console.log(err.message)
    }
    
  }
  // useEffect(() => {
  //   getImgs()
  // }, [])
  if(image){
    const savePhoto = () => {
        MediaLibrary.saveToLibraryAsync(image.uri).then(() => {
            setImage(undefined);
          });

    }
    return (
        <SafeAreaView style={styles.container}>
          <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + image.base64 }} />
          {/* <Button title="Share" onPress={sharePic} /> */}
          {hasMediaLibPermissions ? <Button title="Save" onPress={savePhoto} /> : undefined}
          <Button title="Discard" onPress={() => setImage(undefined)} />
        </SafeAreaView>
      );
    }
    
  
    // if(hasPermissions === false){
    //     return <Text>no access to camera</Text>
    // }
    if (hasPermissions === undefined) {
        return <Text>Requesting permissions...</Text>
      } else if (!hasPermissions) {
        return <Text>Permission for camera not granted. Please change this in settings.</Text>
      }
      
    
  return (
    <View style={styles.container}>
        <Pressable onPress={() => settoggleCamera(true)}>
        {/* <AntDesign name="camera" size={24} color="white" /> */}
        </Pressable>
         {/* <Pressable > */}
          {cameraOnOff && <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
            // autoFocus={null}
            >
                 {/* <Pressable  style={styles.text2} onPress={takePic}>
                 <Ionicons name="md-camera-reverse-outline" size={24} color="black" />
                 </Pressable> */}
                 <Pressable  style={styles.text2} 
                 onPress={()=> {
                saveImg()
                getImgs()
                setcameraOnOff(false)
                  } }
                 >
                <Text>Take a picture </Text>
             </Pressable>
            
            </Camera>}
            <View>
            {getPics && getPics.map(img => {
              
              console.log(publicFolder + img.image)
              // return <Text key={img._id}>{img.image}</Text>
              return <Image key={img._id} style={styles.img} source={{uri: `http://192.168.100.2:5000/images/${img.image}` }} />
              
            })}
            </View>
           
        {/* </Pressable> */}
       
    </View>
  )
}

export default Test2

const styles = StyleSheet.create({
    container: {
        // flex:1,
        // marginTop: 200,
        // marginLeft: 180,
        // backgroundColor: "black"
    },
    img : {
      height: 100,
      width: 100,
      marginTop: 10
    },
    camera: {
       
      
       
       height:"100%"


     },
     text: {
        color: "red"
     },
     text2: {
        color: "green",
        marginTop: 250,
        marginLeft: 120,
        borderColor: "red",
        borderWidth: 10,
        justifyContent: "center",
        width: "40%"


     },
     preview: {
        alignSelf: 'stretch',
        flex: 1
      }
})