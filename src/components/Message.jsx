import { Alert } from "react-native";

const Message = (title, message) => {
  return Alert.alert(
    title,
    message,
    [  
      {
        text: "OK",
        onPress: () => console.log("No callback set!")
      }
    ]
  );
};

export default Message;