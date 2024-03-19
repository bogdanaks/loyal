import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import dayjs from "dayjs"
import { Bed, Coffee, X } from "lucide-react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { IMask, IMaskInput } from "react-imask"
import { toast } from "sonner"
import { z } from "zod"

import { updateShop } from "entities/shop/api"

import { cn } from "shared/libs/utils"
import { Button } from "shared/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "shared/ui/form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/ui/tabs"
import { TelegramButton } from "shared/ui/telegram-button"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const maskOptions: any = {
  mask: "HH{:}MM",
  unmask: true,
  name: "time",
  inputMode: "numeric",
  lazy: true,
  autofix: true,
  overwrite: true,
  blocks: {
    HH: {
      mask: IMask.MaskedRange,
      placeholderChar: "_",
      from: 0,
      to: 23,
      maxLength: 2,
    },
    MM: {
      mask: IMask.MaskedRange,
      placeholderChar: "_",
      from: 0,
      to: 59,
      maxLength: 2,
    },
  },
}

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
  opening_time: "",
  closing_time: "",
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

interface Props {
  shop: Shop
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

export const BusinessSettingsWorkingHours = ({ shop }: Props) => {
  const queryClient = useQueryClient()

  const { mutate } = useMutation<BaseResponse<Shop>, ResponseError, Partial<Shop>, unknown>({
    mutationFn: updateShop,
  })

  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
  })
  const [workingState, setWorkingState] = useState<WorkingHours>(shop.working_hours ?? initValues)

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

  const handleClickSave = () => {
    form.setValue("working_hours", workingState)
    form.handleSubmit(onSubmit)()
  }

  const onSubmit = (data: FormFields) => {
    mutate(
      { ...data, timezone: dayjs.tz.guess() },
      {
        onSuccess: () => {
          toast.success("Успешно сохранено!")
          queryClient.invalidateQueries({ queryKey: ["my-shop"] })
        },
        onError: () => {
          toast.error("Ошибка. Обратитесь в поддержку")
        },
      }
    )
  }

  useEffect(() => {
    if (Object.keys(form.formState.errors).length > 0) {
      toast.error(`Ошибка ввода! Убедитесь в корректности всех данных.`)
    }
  }, [form.formState.errors])

  useEffect(() => {
    console.log(dayjs().format())
    console.log(dayjs().utcOffset())
    // const d = dayjs.tz(dayjs().toISOString(), "Europe/Moscow").toISOString()
    // console.log(dayjs(d).format("HH:mm"))
  }, [])

  return (
    <Tabs defaultValue="monday" className="w-full h-full flex flex-col">
      <TabsList className="bg-background w-full justify-start bg-slate-100">
        {Object.entries(DAYS).map(([key, value]) => {
          const fieldValue = workingState[key as keyof WorkingHours]

          return (
            <TabsTrigger
              key={key}
              className={cn("data-[state=active]:text-primary w-full flex-1", {
                "text-red-400 data-[state=active]:text-red-400": fieldValue.is_day_off,
              })}
              value={key}
            >
              {value}
            </TabsTrigger>
          )
        })}
      </TabsList>
      <Form {...form}>
        {Object.keys(DAYS).map((key) => {
          const fieldValue = workingState[key as keyof WorkingHours]
          return (
            <TabsContent value={key} key={key} className="h-full">
              <div className="flex flex-col h-full w-full pt-2">
                <div
                  key={key}
                  className={cn("flex flex-row items-center gap-4", {
                    "opacity-50": fieldValue.is_day_off,
                  })}
                >
                  <FormField
                    control={form.control}
                    name={`working_hours.${key as keyof WorkingHours}.opening_time`}
                    render={() => (
                      <FormItem className="w-full">
                        <FormControl>
                          <IMaskInput
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={workingState[key as keyof WorkingHours].opening_time}
                            onAccept={(value) => {
                              handleUpdateDay(key as keyof WorkingHours, value, "opening_time")
                            }}
                            placeholder="Открыто с"
                            disabled={fieldValue.is_day_off}
                            {...maskOptions}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <span>-</span>
                  <FormField
                    control={form.control}
                    name={`working_hours.${key as keyof WorkingHours}.closing_time`}
                    render={() => (
                      <FormItem className="w-full">
                        <FormControl>
                          <IMaskInput
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={workingState[key as keyof WorkingHours].closing_time}
                            onAccept={(value) => {
                              handleUpdateDay(key as keyof WorkingHours, value, "closing_time")
                            }}
                            placeholder="Открыто до"
                            disabled={fieldValue.is_day_off}
                            {...maskOptions}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row items-center justify-between w-full mt-4 mb-2">
                  <Button
                    type="button"
                    variant="ghost"
                    className="px-2 h-8 text-slate-500"
                    disabled={fieldValue.is_day_off}
                    onClick={() =>
                      handleUpdateDay(
                        key as keyof WorkingHours,
                        [...fieldValue.breaks, { from_time: "", to_time: "" }],
                        "breaks"
                      )
                    }
                  >
                    <Coffee size={14} className="mr-2" />
                    Добавить перерыв
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className={cn("px-2 h-8 text-slate-500", {
                      "text-red-500 hover:text-red-500": fieldValue.is_day_off,
                    })}
                    onClick={() =>
                      handleUpdateDay(
                        key as keyof WorkingHours,
                        !fieldValue.is_day_off,
                        "is_day_off"
                      )
                    }
                  >
                    <Bed size={14} className="mr-2" />
                    Выходной день
                  </Button>
                </div>
                <ul className="mt-2 mb-4 flex flex-col gap-2 w-full">
                  {!fieldValue.is_day_off &&
                    fieldValue.breaks.map((breakTime, index) => {
                      return (
                        <li className="flex flex-row items-center w-full" key={index}>
                          <Button
                            type="button"
                            variant="ghost"
                            className="max-w-[80px] pl-2 pr-2 mr-2 text-muted-foreground hover:text-accent-foreground"
                            onClick={() => handleRemoveDayBreak(index, key as keyof WorkingHours)}
                          >
                            <X size={20} />
                          </Button>
                          <div className="flex flex-row items-center gap-4 w-full">
                            <FormField
                              control={form.control}
                              name={`working_hours.${key as keyof WorkingHours}.breaks.${index}.from_time`}
                              render={() => (
                                <FormItem className="w-full">
                                  <FormControl>
                                    <IMaskInput
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      value={breakTime.from_time}
                                      onAccept={(value) => {
                                        handleUpdateDayBreak(
                                          key as keyof WorkingHours,
                                          index,
                                          "from_time",
                                          value
                                        )
                                      }}
                                      placeholder="Перерыв с"
                                      disabled={fieldValue.is_day_off}
                                      {...maskOptions}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <span>-</span>
                            <FormField
                              control={form.control}
                              name={`working_hours.${key as keyof WorkingHours}.breaks.${index}.to_time`}
                              render={() => (
                                <FormItem className="w-full">
                                  <FormControl>
                                    <IMaskInput
                                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                      value={breakTime.to_time}
                                      onAccept={(value) => {
                                        handleUpdateDayBreak(
                                          key as keyof WorkingHours,
                                          index,
                                          "to_time",
                                          value
                                        )
                                      }}
                                      placeholder="Перерыв до"
                                      disabled={fieldValue.is_day_off}
                                      {...maskOptions}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </li>
                      )
                    })}
                </ul>
                <TelegramButton
                  type="submit"
                  className="w-fit mt-auto"
                  text="Сохранить"
                  onClick={handleClickSave}
                >
                  Сохранить
                </TelegramButton>
              </div>
            </TabsContent>
          )
        })}
      </Form>
    </Tabs>
  )
}
