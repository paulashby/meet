import { useProvider } from "@/context/AvailabilityContext"
import { formatLocalTime } from "@/lib/availability/helpers"
import type { DateTimeInterval } from "@/lib/types"
import Select from "react-select";

type TimeSelectProps = {
  availability: DateTimeInterval[]
}

export default function TimeSelect({ availability }: TimeSelectProps) {
    const {
        state: { timeZone },
        dispatch,
    } = useProvider()

    return (
      <div className="flex justify-center">
        <Select
            options={availability?.map((slot) => {
                const startStr = formatLocalTime(slot.start, {timeZone});
                const endStr = formatLocalTime(slot.end, {timeZone});
                return {
                    value: slot, 
                    label: `${startStr} – ${endStr}`
                }
            })}
            placeholder="Choose a time slot"
            className={"w-52 block"}
            menuPlacement="auto"
            minMenuHeight={550}
            maxMenuHeight={550}
            onChange={(slot) => {
                if (slot) {
                    const start = slot.value.start;
                    const end = slot.value.end;
                    dispatch({
                        type: "SET_SELECTED_TIME",
                        payload: { start, end },
                    })
                }                
            }}
        />
      </div>
    )
}
