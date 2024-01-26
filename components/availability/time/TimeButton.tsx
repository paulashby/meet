import clsx from "clsx"
import type { DetailedHTMLProps, HTMLAttributes } from "react"

import { useProvider } from "@/context/AvailabilityContext"
import { formatLocalTime } from "@/lib/availability/helpers"
import type { DateTimeInterval } from "@/lib/types"

type TimeProps = {
  time: DateTimeInterval
} & DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Time({ time: { start, end }, ...props }: TimeProps) {
  const {
    state: { timeZone },
    dispatch,
  } = useProvider()

  console.log("typeof start is ", typeof start);
  console.log(start);
  
  
  return (
    <button
      type="button"
      className={clsx(
        "rounded-md border-slate-300 border bg-white py-2 px-3 shadow-sm transition-all",
        "text-sm font-semibold text-gray-900",
        "hocus:bg-slate-100 hocus:shadow-sm hocus:shadow-accent-100 hocus:-mt-0.5 hocus:mb-0.5 hocus:border-am-mid-grey-light",
        "active:mt-0.5 active:-mb-0.5  outline-accent-500"
      )}
      onClick={() => {
        dispatch({
          type: "SET_SELECTED_TIME",
          payload: { start, end },
        })
      }}
      {...props}>
      {formatLocalTime(start, { timeZone })} –{" "}
      {formatLocalTime(end, { timeZone })}
    </button>
  )
}
