import { StyleSheet } from "react-native"

import { theme } from "shared/config/theme"
import { Segment } from "shared/ui/segment"

type Days = "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday" | "sunday"

interface Props {
  selectedDay: Days
  workingHours: WorkingHours
  onChange: (day: Days) => void
}

export const WeekTabs = ({ selectedDay, workingHours, onChange }: Props) => {
  return (
    <Segment value={selectedDay} onChange={onChange}>
      <Segment.Item
        value="monday"
        styleText={workingHours["monday"].is_day_off ? styles.selectDayOff : {}}
      >
        ПН
      </Segment.Item>
      <Segment.Item
        value="tuesday"
        styleText={workingHours["tuesday"].is_day_off ? styles.selectDayOff : {}}
      >
        ВТ
      </Segment.Item>
      <Segment.Item
        value="wednesday"
        styleText={workingHours["wednesday"].is_day_off ? styles.selectDayOff : {}}
      >
        СР
      </Segment.Item>
      <Segment.Item
        value="thursday"
        styleText={workingHours["thursday"].is_day_off ? styles.selectDayOff : {}}
      >
        ЧТ
      </Segment.Item>
      <Segment.Item
        value="friday"
        styleText={workingHours["friday"].is_day_off ? styles.selectDayOff : {}}
      >
        ПТ
      </Segment.Item>
      <Segment.Item
        value="saturday"
        styleText={workingHours["saturday"].is_day_off ? styles.selectDayOff : {}}
      >
        СБ
      </Segment.Item>
      <Segment.Item
        value="sunday"
        styleText={workingHours["sunday"].is_day_off ? styles.selectDayOff : {}}
      >
        ВС
      </Segment.Item>
    </Segment>
  )
}

const styles = StyleSheet.create({
  selectDayOff: {
    color: theme.destructive,
  },
})
