import { StatusBar } from "expo-status-bar"
import { SendFeedback } from "features/app"

import { ScreenContainer } from "widgets/ui/screen-container"

export const FeedbackScreen = () => {
  return (
    <ScreenContainer style={{ paddingVertical: 16 }}>
      <StatusBar style="dark" animated={true} backgroundColor="#fff" />
      <SendFeedback />
    </ScreenContainer>
  )
}
