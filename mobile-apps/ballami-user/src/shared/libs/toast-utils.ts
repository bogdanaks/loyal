import Toast from "react-native-toast-message"

export const showSuccess = (msg?: string) => {
  Toast.show({
    type: "success",
    text1: msg ?? "Успешно сохранено!",
  })
}

export const showError = (msg?: string) => {
  Toast.show({
    type: "error",
    text1: msg ?? "Ошибка. Обратитесь в поддержку",
  })
}
