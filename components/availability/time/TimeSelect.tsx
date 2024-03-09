import { useProvider } from "@/context/AvailabilityContext"
import { formatLocalTime } from "@/lib/availability/helpers"
import type { DateTimeInterval } from "@/lib/types"
import { redirect } from "next/dist/server/api-utils";
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
                control: (baseStyles, { isFocused }) => ({
                    ...baseStyles,
                    position: "relative",
                    zIndex: "2",
                    boxShadow: "none",
                    ":hover": {
                        borderColor: isFocused ? "rgb(98, 119, 134)" : "rgb(209 213 219)",
                    },
                    border: isFocused ? "2px solid rgb(98, 119, 134)" : "1 px rgb(209 213 219)"
                }),
                menu: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "10.25rem",
                    backgroundColor: "#fff",
                    "&:before": {
                        content: "''",
                        position: "absolute",
                        left: "-4.3rem",
                        right: "-4.3rem",
                        top: "-35rem",
                        bottom: "-4rem",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: "-1",
                        pointerEvents: "none",
                    },
                }),
                menuList: (baseStyles) => ({
                    ...baseStyles,
                    border: "1px solid #ddd",
                    backgroundColor: "#fff"
                }),
                option: (baseStyles, state) => ({
                    ...baseStyles,
                    fontSize: "0.95rem",
                    fontWeight: "500",
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
