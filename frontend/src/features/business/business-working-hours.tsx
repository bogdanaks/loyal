import { Bed, Coffee, X } from "lucide-react"
import { useState } from "react"
import { IMask, IMaskInput } from "react-imask"

import { cn } from "shared/libs/utils"
import { Button } from "shared/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "shared/ui/tabs"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const maskOptions: any = {
  mask: "HH:MM",
  unmask: true,
  name: "time",
  inputMode: "numeric",
  blocks: {
    HH: {
      mask: IMask.MaskedRange,
      placeholderChar: "HH",
      from: 0,
      to: 23,
      maxLength: 2,
    },
    MM: {
      mask: IMask.MaskedRange,
      placeholderChar: "MM",
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

export const BusinessSettingsWorkingHours = ({ shop }: Props) => {
  const [common, setCommon] = useState(defaultByDay)
  const [workingState, setWorkingState] = useState<WorkingHours>(shop.working_hours ?? initValues)

  console.log("common", common)

  const handleCommonChange = (value: string | WorkingTimeBreak[], field: keyof WorkingTimeDay) => {
    setCommon({ ...common, [field]: value })
    const updatedState = {
      monday: {
        ...workingState.monday,
        [field]: value,
      },
      tuesday: {
        ...workingState.tuesday,
        [field]: value,
      },
      wednesday: {
        ...workingState.wednesday,
        [field]: value,
      },
      thursday: {
        ...workingState.thursday,
        [field]: value,
      },
      friday: {
        ...workingState.friday,
        [field]: value,
      },
      saturday: {
        ...workingState.saturday,
        [field]: value,
      },
      sunday: {
        ...workingState.sunday,
        [field]: value,
      },
    }
    setWorkingState(updatedState)
  }

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

  const handleUpdateCommonBreak = (index: number, key: keyof WorkingTimeBreak, value: string) => {
    const copyCommon: WorkingTimeDay = JSON.parse(JSON.stringify(common))
    copyCommon.breaks.splice(index, 1, { ...copyCommon.breaks[index], [key]: value })
    setCommon(copyCommon)

    const copy: WorkingHours = JSON.parse(JSON.stringify(workingState))
    for (const day of Object.values(copy)) {
      day.breaks.splice(index, 1, { ...day.breaks[index], [key]: value })
    }
    setWorkingState(copy)
  }

  const handleRemoveCommonBreak = (index: number) => {
    const copyCommon: WorkingTimeDay = JSON.parse(JSON.stringify(common))
    copyCommon.breaks.splice(index, 1)
    setCommon(copyCommon)

    const copy: WorkingHours = JSON.parse(JSON.stringify(workingState))
    for (const day of Object.values(copy)) {
      day.breaks.splice(index, 1)
    }
    setWorkingState(copy)
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

  return (
    <Tabs defaultValue="common" className="w-full h-full flex flex-col">
      <TabsList className="bg-background w-full justify-start bg-slate-100">
        <TabsTrigger
          key="common"
          className="data-[state=active]:text-primary flex-1"
          value="common"
        >
          Общий
        </TabsTrigger>
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
      <TabsContent value="common" className="h-full">
        <div className="flex flex-col h-full">
          <span className="text-muted-foreground text-sm mb-4 flex">
            Изменение общего графика переопределяет изменения для каждого дня недели
          </span>
          <div className="flex flex-row items-center gap-4">
            <IMaskInput
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={common.opening_time}
              onAccept={(value) => {
                handleCommonChange(value, "opening_time")
              }}
              placeholder="Открыто с"
              mask="HH:MM"
              unmask={true}
              name="time"
              inputMode="numeric"
              blocks={{
                HH: {
                  mask: Number,
                  placeholderChar: "HH",
                  from: 0,
                  to: 23,
                  maxLength: 2,
                  scale: 2,
                  padFractionalZeros: true,
                },
                MM: {
                  mask: Number,
                  placeholderChar: "MM",
                  from: 0,
                  to: 59,
                  maxLength: 2,
                  scale: 2,
                  padFractionalZeros: true,
                },
              }}
              // {...maskOptions}
            />
            <span>-</span>
            <IMaskInput
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={common.closing_time}
              onAccept={(value) => {
                handleCommonChange(value, "closing_time")
              }}
              placeholder="Открыто до"
              {...maskOptions}
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            className="px-2 h-8 mt-4 mb-2 mr-auto text-slate-500"
            onClick={() =>
              handleCommonChange([...common.breaks, { from_time: "", to_time: "" }], "breaks")
            }
          >
            <Coffee size={14} className="mr-2" />
            Добавить перерыв
          </Button>
          <ul className="mt-2 flex flex-col gap-2 mb-4">
            {common.breaks.map((breakTime, index) => {
              return (
                <li className="flex flex-row items-center w-full" key={index}>
                  <Button
                    type="button"
                    variant="ghost"
                    className="max-w-[80px] pl-2 pr-2 mr-2 text-muted-foreground hover:text-accent-foreground"
                    onClick={() => handleRemoveCommonBreak(index)}
                  >
                    <X size={20} />
                  </Button>
                  <div className="flex flex-row items-center gap-4 w-full">
                    <IMaskInput
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={breakTime.from_time}
                      onAccept={(value) => {
                        handleUpdateCommonBreak(index, "from_time", value)
                      }}
                      placeholder="Перерыв с"
                      {...maskOptions}
                    />
                    <span>-</span>
                    <IMaskInput
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={breakTime.to_time}
                      onAccept={(value) => {
                        handleUpdateCommonBreak(index, "to_time", value)
                      }}
                      placeholder="Перерыв до"
                      {...maskOptions}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
          <Button type="button" className="w-fit mt-auto">
            Сохранить
          </Button>
        </div>
      </TabsContent>
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
                <span>-</span>
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
                    handleUpdateDay(key as keyof WorkingHours, !fieldValue.is_day_off, "is_day_off")
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
                          <span>-</span>
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
                        </div>
                      </li>
                    )
                  })}
              </ul>
              <Button type="button" className="w-fit mt-auto">
                Сохранить
              </Button>
            </div>
          </TabsContent>
        )
      })}
    </Tabs>
  )
}
