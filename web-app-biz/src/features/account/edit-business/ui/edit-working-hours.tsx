import { useEffect, useState } from "react";
import { PiPlusBold, PiTrashBold } from "react-icons/pi";
import { IMask, IMaskInput } from "react-imask";

import { Button } from "shared/ui/button";
import { Checkbox } from "shared/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "shared/ui/drawer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "shared/ui/select";

const FULL_DAYS = [
  {
    name: "Понедельник",
    key: "monday",
  },
  {
    name: "Вторник",
    key: "tuesday",
  },
  {
    name: "Среда",
    key: "wednesday",
  },
  {
    name: "Четверг",
    key: "thursday",
  },
  {
    name: "Пятница",
    key: "friday",
  },
  {
    name: "Суббота",
    key: "saturday",
  },
  {
    name: "Воскресенье",
    key: "sunday",
  },
];
const DAYS = {
  monday: "ПН",
  tuesday: "ВТ",
  wednesday: "СР",
  thursday: "ЧТ",
  friday: "ПТ",
  saturday: "СБ",
  sunday: "ВС",
};
const keysDays = Object.keys(DAYS);
const weekDays = keysDays.filter((key) => {
  if (key === "saturday" || key === "sunday") {
    return false;
  }
  return key;
});

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
};

interface AllDayState {
  opening_time: string;
  closing_time: string;
  breaks_time_from: string;
  breaks_time_to: string;
  days: string[];
}

interface SettingsByDayState {
  day: string;
  opening_time: string;
  closing_time: string;
  breaks_time_from: string;
  breaks_time_to: string;
}

interface Props {
  value: WorkingHours;
  onSave: (value: WorkingHours) => void;
}

export const EditWorkingHours = ({ value, onSave }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [workingState, setWorkingState] = useState<WorkingHours>({
    common: {
      opening_time: "",
      closing_time: "",
      breaks_time_from: "",
      breaks_time_to: "",
      days: keysDays,
    },
    by_days: {},
  });
  const [settingsByDay, setSettingsByDay] = useState<SettingsByDayState[]>([]);

  useEffect(() => {
    if (value) {
      setWorkingState(value);
    }
  }, [value]);

  const handleClickWeekDays = () => {
    setWorkingState((prevState) => ({
      ...prevState,
      common: {
        ...prevState.common,
        days: weekDays,
      },
    }));
  };

  const handleClickEveryDay = () => {
    setWorkingState((prevState) => ({
      ...prevState,
      common: {
        ...prevState.common,
        days: keysDays,
      },
    }));
  };

  const handleClick247 = () => {
    setWorkingState((prevState) => ({
      ...prevState,
      common: {
        ...prevState.common,
        opening_time: "00:00",
        closing_time: "23:59",
      },
    }));
  };

  const handleChangeDayOff = (day: string) => {
    if (workingState.common.days.includes(day)) {
      setWorkingState((prevState) => ({
        ...prevState,
        common: {
          ...prevState.common,
          days: prevState.common.days.filter((d) => d !== day),
        },
      }));
    } else {
      setWorkingState((prevState) => ({
        ...prevState,
        common: {
          ...prevState.common,
          days: [...prevState.common.days, day],
        },
      }));
    }
  };

  const handleAllChange = (value: string, field: keyof AllDayState) => {
    setWorkingState((prevState) => ({
      ...prevState,
      common: {
        ...prevState.common,
        [field]: value,
      },
    }));
  };

  const handleAddSettingByDay = () => {
    setSettingsByDay((prevState) => [
      ...prevState,
      {
        day: "",
        opening_time: "",
        closing_time: "",
        breaks_time_from: "",
        breaks_time_to: "",
      },
    ]);
  };

  const handleSettingsByDaySetDay = (day: string, index: number) => {
    const newSettings = settingsByDay.map((sbd, i) => {
      if (i === index) {
        return {
          ...sbd,
          day,
        };
      }
      return sbd;
    });

    setSettingsByDay(newSettings);
  };

  const handleSettingsByDayValue = (day: string, field: string, value: string) => {
    const newSettings = settingsByDay.map((sbd) => {
      if (sbd.day === day) {
        return {
          ...sbd,
          [field]: value,
        };
      }
      return sbd;
    });

    setSettingsByDay(newSettings);
  };

  const handleDeleteSettingsByDay = (day: string) => {
    setSettingsByDay((prevState) => prevState.filter((sbd) => sbd.day !== day));
  };

  const handleSave = () => {
    const byDaysData: Record<string, object> = {};
    for (const sbd of settingsByDay) {
      byDaysData[sbd.day] = {
        opening_time: sbd.opening_time,
        closing_time: sbd.closing_time,
        breaks_time_from: sbd.breaks_time_from,
        breaks_time_to: sbd.breaks_time_to,
      };
    }

    const formattingState = {
      ...workingState,
      by_days: byDaysData,
    };
    onSave(formattingState as WorkingHours);
    setIsOpen(false);
  };

  const selectFullDays = FULL_DAYS.filter((fd) => workingState.common.days.includes(fd.key));

  return (
    <Drawer open={isOpen} onOpenChange={(toggle) => setIsOpen(toggle)}>
      <DrawerTrigger>
        <Button className="w-full h-10" variant="outline" type="button">
          Настроить режим работы
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Настройка режима работы</DrawerTitle>
        </DrawerHeader>
        <ul className="mt-2 flex flex-col gap-2 px-4 overflow-y-auto">
          <div className="flex flex-row gap-2 overflow-x-auto">
            <Button
              variant="ghost"
              className="rounded-3xl bg-slate-200 h-8 hover:bg-primary-disabled"
              type="button"
              onClick={handleClickWeekDays}
            >
              По будням
            </Button>
            <Button
              variant="ghost"
              className="rounded-3xl bg-slate-200 h-8 hover:bg-primary-disabled"
              type="button"
              onClick={handleClickEveryDay}
            >
              Ежедневно
            </Button>
            <Button
              variant="ghost"
              className="rounded-3xl bg-slate-200 h-8 hover:bg-primary-disabled"
              type="button"
              onClick={handleClick247}
            >
              Круглосуточно
            </Button>
          </div>
          <li className="flex flex-row gap-2">
            <IMaskInput
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={workingState.common.opening_time}
              onAccept={(value) => {
                handleAllChange(value, "opening_time");
              }}
              placeholder="Открыто с"
              {...maskOptions}
            />
            <IMaskInput
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={workingState.common.closing_time}
              onAccept={(value) => {
                handleAllChange(value, "closing_time");
              }}
              placeholder="Открыто до"
              {...maskOptions}
            />
          </li>
          <li className="flex flex-row gap-2">
            <IMaskInput
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={workingState.common.breaks_time_from}
              onAccept={(value) => {
                handleAllChange(value, "breaks_time_from");
              }}
              placeholder="Перерыв с"
              {...maskOptions}
            />
            <IMaskInput
              className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={workingState.common.breaks_time_to}
              onAccept={(value) => {
                handleAllChange(value, "breaks_time_to");
              }}
              placeholder="Перерыв до"
              {...maskOptions}
            />
          </li>
          <ul className="flex flex-row items-center justify-between mt-2 mb-2">
            {Object.entries(DAYS).map(([dayKey, dayName]) => {
              const dKey = dayKey as keyof WorkingHours;
              const checked =
                settingsByDay.some((sbd) => sbd.day === dayKey) ||
                workingState.common.days.includes(dKey);

              return (
                <label key={dayKey} htmlFor={dayKey} className="flex flex-col items-center px-2">
                  <Checkbox
                    id={dayKey}
                    checked={checked}
                    onClick={() => handleChangeDayOff(dKey)}
                    disabled={settingsByDay.some((sbd) => sbd.day === dayKey)}
                  />
                  <span className="text-xs">{dayName}</span>
                </label>
              );
            })}
          </ul>
          {settingsByDay.map((setByDay, index) => {
            return (
              <div className="flex flex-col gap-2 border-t-2 pt-4 pb-2" key={setByDay.day}>
                <Select
                  onValueChange={(value) => handleSettingsByDaySetDay(value, index)}
                  value={setByDay.day}
                >
                  <div className="flex flex-row gap-2">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Выберите день" />
                    </SelectTrigger>
                    <Button
                      variant="ghost"
                      type="button"
                      className="flex items-center justify-center text-xl p-0 h-10 w-10 text-muted-foreground"
                      onClick={() => handleDeleteSettingsByDay(setByDay.day)}
                    >
                      <PiTrashBold />
                    </Button>
                  </div>
                  <SelectContent>
                    {selectFullDays.map((kDay) => (
                      <SelectItem
                        key={kDay.key}
                        value={kDay.key}
                        disabled={settingsByDay.some((sbd) => sbd.day === kDay.key)}
                      >
                        {kDay.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <li className="flex flex-row gap-2">
                  <IMaskInput
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={setByDay.opening_time}
                    onAccept={(value) => {
                      handleSettingsByDayValue(setByDay.day, "opening_time", value);
                    }}
                    placeholder="Открыто с"
                    {...maskOptions}
                  />
                  <IMaskInput
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={setByDay.closing_time}
                    onAccept={(value) => {
                      handleSettingsByDayValue(setByDay.day, "closing_time", value);
                    }}
                    placeholder="Открыто до"
                    {...maskOptions}
                  />
                </li>
                <li className="flex flex-row gap-2">
                  <IMaskInput
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={setByDay.breaks_time_from}
                    onAccept={(value) => {
                      handleSettingsByDayValue(setByDay.day, "breaks_time_from", value);
                    }}
                    placeholder="Перерыв с"
                    {...maskOptions}
                  />
                  <IMaskInput
                    className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={setByDay.breaks_time_to}
                    onAccept={(value) => {
                      handleSettingsByDayValue(setByDay.day, "breaks_time_to", value);
                    }}
                    placeholder="Перерыв до"
                    {...maskOptions}
                  />
                </li>
              </div>
            );
          })}
          <Button
            type="button"
            className="h-10 mt-2"
            variant="outline"
            onClick={handleAddSettingByDay}
          >
            <PiPlusBold className="mr-2" />
            Настроить отдельный день
          </Button>
        </ul>
        <DrawerFooter>
          <Button className="mt-2" type="button" onClick={handleSave}>
            Сохранить
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
