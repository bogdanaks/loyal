import ct from "countries-and-timezones"
import dayjs from "dayjs"

export const formatByTz = (time: string, tz: string) => {
  const timezone = ct.getTimezone(tz)
  if (!timezone) {
    return time
  }

  const formatedShopTime = dayjs(time, "HH:mm")
  const shopTimeByTz = dayjs(formatedShopTime.format()).utcOffset(timezone.utcOffset)
  return shopTimeByTz.format("HH:mm")
}
