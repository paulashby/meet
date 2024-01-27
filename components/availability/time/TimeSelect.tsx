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
            placeholder="Choose time"
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
            styles={{
                container: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "10.5rem",
                }),
                control: (baseStyles) => ({
                    ...baseStyles,
                    position: "relative",
                    zIndex: "2",
                }),
                menu: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "10.25rem",
                    "&:before": {
                        content: "''",
                        position: "absolute",
                        left: "-10rem",
                        right: "-10rem",
                        top: "-10rem",
                        bottom: "-10rem",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        zIndex: "-1",
                        pointerEvents: "none",
                    },
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: "0.95rem",
                    fontWeight: "700",
                    padding: "0.24rem 2rem",
                }),
                placeholder: (defaultStyles) => {
                    return {
                        ...defaultStyles,
                        color: '#000',
                    }
                },
            }}
        />
      </div>
    )
}
