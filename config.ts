import type { AvailabilitySlotsMap } from "./lib/types"

export const ALLOWED_DURATIONS = [30]

export const DEFAULT_DURATION = 30

export const CALENDARS_TO_CHECK = ["primary"]
export const SLOT_PADDING = 10
export const OWNER_TIMEZONE = "Europe/London"
export const LEAD_TIME = 0

const DEFAULT_WORKDAY = [
  {
    start: {
      hour: 9,
    },
    end: {
      hour: 17,
    },
  },
]

export const OWNER_AVAILABILITY: AvailabilitySlotsMap = {
  1: DEFAULT_WORKDAY,
  2: DEFAULT_WORKDAY,
  3: DEFAULT_WORKDAY,
  4: DEFAULT_WORKDAY,
  5: DEFAULT_WORKDAY,
}

export const LOCAL_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
}

export const LOCAL_TIME_OPTIONS: Intl.DateTimeFormatOptions = {
  hour: "numeric",
  minute: "numeric",
}
