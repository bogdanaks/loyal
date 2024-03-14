import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { KeyboardAwareScrollView } from "react-native-keyboard-controller"
import { z } from "zod"

import { WeekTabs } from "entities/business/ui"
import { updateShop } from "entities/shop/api"
import { useShopStore } from "entities/shop/model/store"

import { BedIcon } from "shared/assets/icons/bed-icon"
import { CoffeeIcon } from "shared/assets/icons/coffee-icon"
import { CrossIcon } from "shared/assets/icons/cross-icon"
import { timeMask } from "shared/config/masks"
import { theme } from "shared/config/theme"
import { showError, showSuccess } from "shared/libs/toast-utils"
import { Button } from "shared/ui/button"
import { InputImask } from "shared/ui/input-imask"

const DAYS = {
  monday: "ПН",
  tuesday: "ВТ",
  wednesday: "СР",
  thursday: "ЧТ",
  friday: "ПТ",
  saturday: "СБ",
  sunday: "ВС",
}

const defaultByDay: WorkingTimeDay = {
  opening_time: "00:00",
  closing_time: "23:59",
  is_day_off: false,
  breaks: [],
}

const initValues: WorkingHours = {
  monday: defaultByDay,
  tuesday: defaultByDay,
  wednesday: defaultByDay,
  thursday: defaultByDay,
  friday: defaultByDay,
  saturday: defaultByDay,
  sunday: defaultByDay,
}

const breakSchema = z.object({
  from_time: z
    .string()
    .min(0)
    .max(5)
    .refine((val) => /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/.test(val), {
      message: "Некорректный формат времени.",
    }),
  to_time: z
    .string()
    .min(0)
    .max(5)
    .refine((val) => /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/.test(val), {
      message: "Некорректный формат времени.",
    }),
})

const workDaySchema = z.object({
  opening_time: z
    .string()
    .min(0)
    .max(5)
    .refine((val) => /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/.test(val), {
      message: "Некорректный формат времени.",
    }),
  closing_time: z
    .string()
    .min(0)
    .max(5)
    .refine((val) => /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/.test(val), {
      message: "Некорректный формат времени.",
    }),
  is_day_off: z.boolean(),
  breaks: z.array(breakSchema),
})

const formSchema = z.object({
  working_hours: z.object(
    {
      monday: workDaySchema,
      tuesday: workDaySchema,
      wednesday: workDaySchema,
      thursday: workDaySchema,
      friday: workDaySchema,
      saturday: workDaySchema,
      sunday: workDaySchema,
    },
    {
      required_error: "Обязательное настройте график.",
      invalid_type_error: "Обязательное настройте график.",
    }
  ),
})
type FormFields = z.infer<typeof formSchema>

export const BusinessSettingsWorkingHours = () => {
  const [selectedDay, setSelectedDay] = useState<keyof typeof DAYS>("monday")
  const shop = useShopStore((state) => state.shop)
  const queryClient = useQueryClient()

  const { mutate, isPending } = useMutation<
    BaseResponse<Shop>,
    ResponseError,
    Partial<Shop>,
    unknown
  >({
    mutationFn: updateShop,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  })
  const [workingState, setWorkingState] = useState<WorkingHours>(shop?.working_hours ?? initValues)

  const handleUpdateDay = (
    day: keyof WorkingHours,
    value: string | boolean | WorkingTimeBreak[],
    field: keyof WorkingTimeDay
  ) => {
    const updatedState = {
      ...workingState,
      [day]: {
        ...workingState[day],
        [field]: value,
      },
    }
    setWorkingState(updatedState)
  }

  const handleUpdateDayBreak = (
    day: keyof WorkingHours,
    indexBreak: number,
    keyBreak: keyof WorkingTimeBreak,
    value: string
  ) => {
    const copy: WorkingHours = JSON.parse(JSON.stringify(workingState))
    copy[day].breaks.splice(indexBreak, 1, {
      ...copy[day].breaks[indexBreak],
      [keyBreak]: value,
    })
    setWorkingState(copy)
  }

  const handleRemoveDayBreak = (index: number, day: keyof WorkingHours) => {
    const copy: WorkingHours = JSON.parse(JSON.stringify(workingState))
    copy[day].breaks.splice(index, 1)
    setWorkingState(copy)
  }

  const handlePressSave = () => {
    form.setValue("working_hours", workingState)
    form.handleSubmit(onSubmit)()
  }

  const onSubmit = (data: FormFields) => {
    mutate(data, {
      onSuccess: () => {
        showSuccess()
        queryClient.invalidateQueries({ queryKey: ["my-shop"] })
      },
      onError: () => {
        showError()
      },
    })
  }

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      showError("Ошибка ввода! Убедитесь в корректности всех данных.")
    }
  }, [form.formState.errors])

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{
        gap: 16,
        padding: 16,
        flexGrow: 1,
      }}
    >
      <WeekTabs selectedDay={selectedDay} workingHours={workingState} onChange={setSelectedDay} />
      <View style={styles.timeBlock}>
        <InputImask
          opts={timeMask}
          value={workingState[selectedDay].opening_time}
          keyboardType="number-pad"
          onChangeText={(value) => handleUpdateDay(selectedDay, value, "opening_time")}
          placeholder="Открыто с"
          style={styles.timeInput}
        />
        <InputImask
          opts={timeMask}
          value={workingState[selectedDay].closing_time}
          keyboardType="number-pad"
          onChangeText={(value) => handleUpdateDay(selectedDay, value, "closing_time")}
          placeholder="Открыто до"
          style={styles.timeInput}
        />
      </View>
      <View style={styles.breakBlock}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          onPress={() =>
            handleUpdateDay(
              selectedDay,
              [...workingState[selectedDay].breaks, { from_time: "", to_time: "" }],
              "breaks"
            )
          }
        >
          <CoffeeIcon color={theme.mutedForeground} />
          <Text style={{ color: theme.mutedForeground }}>Добавить перерыв</Text>
        </Pressable>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          onPress={() =>
            handleUpdateDay(selectedDay, !workingState[selectedDay].is_day_off, "is_day_off")
          }
        >
          <BedIcon
            color={
              !workingState[selectedDay].is_day_off ? theme.mutedForeground : theme.destructive
            }
          />
          <Text
            style={{
              color: !workingState[selectedDay].is_day_off
                ? theme.mutedForeground
                : theme.destructive,
            }}
          >
            Выходной день
          </Text>
        </Pressable>
      </View>
      <View style={{ flexDirection: "column", gap: 8, marginBottom: "auto" }}>
        {workingState[selectedDay].breaks.map((breakDay, index) => (
          <View style={{ flexDirection: "row", gap: 8, width: "100%" }} key={index}>
            <View style={styles.timeBreakBlock}>
              <InputImask
                opts={timeMask}
                value={breakDay.from_time}
                keyboardType="number-pad"
                onChangeText={(value) =>
                  handleUpdateDayBreak(selectedDay, index, "from_time", value)
                }
                placeholder="Перерыв с"
                style={styles.timeInput}
              />
              <InputImask
                opts={timeMask}
                value={breakDay.to_time}
                keyboardType="number-pad"
                onChangeText={(value) => handleUpdateDayBreak(selectedDay, index, "to_time", value)}
                placeholder="Перерыв до"
                style={styles.timeInput}
              />
            </View>
            <Pressable
              style={styles.removeBreak}
              onPress={() => handleRemoveDayBreak(index, selectedDay)}
            >
              <CrossIcon color={theme.mutedForeground} />
            </Pressable>
          </View>
        ))}
      </View>
      <Button onPress={handlePressSave} disabled={isPending} style={{ marginTop: 24 }}>
        Сохранить
      </Button>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  timeBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  timeInput: {
    flex: 1,
    width: "100%",
  },
  timeBreakBlock: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
    width: "100%",
  },
  breakBlock: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  removeBreak: {
    alignItems: "center",
    justifyContent: "center",
  },
})
