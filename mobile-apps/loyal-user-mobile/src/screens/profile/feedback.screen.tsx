import { useState } from "react"
import { Alert, Text, TextInput } from "react-native"
import { Button } from "shared/ui"
import { ScreenContainer } from "widgets/ui/screen-container"

export const FeedbackScreen = () => {
  const [text, setText] = useState("")
  const createButtonAlert = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ])
    setText("")
  }

  return (
    <ScreenContainer>
      <TextInput
        multiline={true}
        value={text}
        onChangeText={(t) => setText(t)}
        style={{
          minHeight: 100,
          padding: 10,
          borderWidth: 1,
          borderColor: "black",
          borderRadius: 5,
          marginBottom: 10,
        }}
      />
      <Button onPress={createButtonAlert}>
        <Text>Отправить</Text>
      </Button>
    </ScreenContainer>
  )
}
