import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import ImagePicker from "react-native-image-picker";
import axios from "axios";
function TestImg() {
  const [image, setImage] = useState("xxx");
  const uploadImg = async () => {
    const formData = new FormData();

    formData.append("image", {
      name: new Date() + "_image",
      uri: image,
      type: "image/jpg",
    });
    console.log(formData);
    // try{
    //   const data = await axios.post("http://192.168.100.2:5000/api/images/addImg", formData, {
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'multipart/form-data',

    //     },
    //   })

    // }

    // catch (error) {
    //   console.log(error.message);
    // }
  };
  return (
    <View>
      <Pressable onPress={uploadImg}>
        <Text>testing image</Text>
      </Pressable>
    </View>
  );
}

export default TestImg;
