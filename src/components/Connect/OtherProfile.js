import { View, Text } from "react-native";
import { getUserDetails } from "../../features/auth/authSlice";
import { useSelector } from "react-redux";

const OtherProfile = () => {
  const { userDetails } = useSelector((state) => state.auth);
  return (
    <View>
      <Text>{userDetails.firstName}</Text>
    </View>
  );
};

export default OtherProfile;
