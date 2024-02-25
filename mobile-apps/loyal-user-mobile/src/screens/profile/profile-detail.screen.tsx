import { StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native"
import { ScreenContainer } from "widgets/ui/screen-container"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { maskDate } from "shared/libs/utils"
import { Button } from "shared/ui"

interface FormState {
  name: string
  surname: string
  birthday: string
}

export const ProfileDetailScreen = () => {
  const form = useForm<FormState>({
    defaultValues: {
      name: "",
      surname: "",
      birthday: "",
    },
  })

  const onSubmit: SubmitHandler<FormState> = (data) => {
    console.log("data", data)
  }

  return (
    <ScreenContainer>
      <View style={styles.form}>
        <View>
          <Text style={styles.label}>Имя</Text>
          <Controller
            control={form.control}
            name="name"
            rules={{ required: { message: "Обязательное поле", value: true } }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={field.onChange} value={field.value} />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Фамилия</Text>
          <Controller
            control={form.control}
            name="surname"
            rules={{ required: { message: "Обязательное поле", value: true } }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput style={styles.input} onChangeText={field.onChange} value={field.value} />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
        </View>
        <View>
          <Text style={styles.label}>Дата рождения</Text>
          <Controller
            control={form.control}
            name="birthday"
            rules={{ pattern: { value: /^\d{4}-\d{2}-\d{2}$/, message: "Неверный формат" } }}
            render={({ field, fieldState: { error } }) => (
              <>
                <TextInput
                  style={styles.input}
                  onChangeText={(value) => field.onChange(maskDate(value))}
                  value={field.value}
                  placeholder="31.12.1998"
                  keyboardType="numeric"
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
        </View>
      </View>
      <Button onPress={form.handleSubmit(onSubmit)}>
        <Text>Сохранить</Text>
      </Button>
    </ScreenContainer>
  )
}

const styles = StyleSheet.create({
  form: {
    gap: 16,
  },
  input: {
    width: "auto",
    height: "auto",
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    borderColor: "white",
  },
  label: {
    fontSize: 14,
    opacity: 0.5,
    marginBottom: 6,
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 2,
  },
})
