import { Dialog } from "@headlessui/react"
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context"
import { useRouter } from "next/navigation"
import type { Dispatch, FormEvent } from "react"

import Modal from "../Modal"
import Spinner from "../Spinner"
import type { ActionType } from "@/context/AvailabilityContext"
import { useProvider } from "@/context/AvailabilityContext"
import { formatLocalDate, formatLocalTime } from "@/lib/availability/helpers"

const locations = [
  {
    name: "Google Meet",
    value: "meet",
  },
]

export default function BookingForm() {
  const {
    state: { modal, selectedTime, timeZone, duration },
    dispatch,
  } = useProvider()
  const router = useRouter()

  if (!selectedTime || !timeZone) {
    return <></>
  }

  const dateString = formatLocalDate(selectedTime.start, { timeZone })
  const startString = formatLocalTime(selectedTime.start, { timeZone })
  const endString = formatLocalTime(selectedTime.end, {
    timeZone,
    timeZoneName: "shortGeneric",
  })

  return (
    <Modal
      open={modal !== "closed"}
      setOpen={(open) => {
        dispatch({ type: "SET_MODAL", payload: open ? "open" : "closed" })
      }}>
      <form
        className="mt-3 sm:mt-0 sm:ml-4"
        onSubmit={(event) => {
          handleSubmit(event, dispatch, router)
        }}>
        <Dialog.Title
          as="h3"
          className="text-base font-semibold leading-6 text-white">
          Request appointment
        </Dialog.Title>

        <input
          type="hidden"
          name="start"
          value={selectedTime.start.toISOString()}
        />
        <input
          type="hidden"
          name="end"
          value={selectedTime.end.toISOString()}
        />
        <input type="hidden" name="duration" value={duration} />
        <input type="hidden" name="timeZone" value={timeZone} />

        <div className="border-l-4 border-l-accent-500 bg-white p-3 mt-3 mb-4 rounded-md">
          <p className="text-sm md:text-base font-semibold text-accent-800">
            {dateString}
          </p>
          <p className="text-xs md:text-sm">
            {startString} - {endString}
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <div className="flex-grow">
            <label
              htmlFor="subject"
              className="block text-sm font-medium leading-0 text-white">
              To discuss
            </label>
            <select
              required
              id="subject"
              name="subject"
              defaultValue={"Please Choose..."}
              className="mt-1 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-accent-600 sm:text-sm sm:leading-6 overflow-x-clip">
              <option value="Platform Integration">Platform Integration</option>
              <option value="Institutional API">Institutional API</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="isolate -space-y-px rounded-md shadow-sm">
            <div className="relative bg-white rounded-md rounded-b-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-accent-600">
              <label
                htmlFor="name"
                className="block text-xs font-medium text-gray-900">
                Name
              </label>
              <input
                aria-label="Name"
                type="text"
                autoCapitalize="words"
                autoComplete="name"
                required
                aria-required
                name="name"
                id="name"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="Jane Smith"
              />
            </div>
            <div
              className="relative bg-white px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-accent-600">
              <label
                htmlFor="email"
                className="block text-xs font-medium text-gray-900">
                Email Address
              </label>
              <input
                aria-label="Email"
                required
                aria-required
                type="email"
                name="email"
                id="email"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                placeholder="jsmith@gmail.com"
              />
            </div>
            <div className="relative bg-white rounded-md rounded-t-none px-3 pt-2.5 pb-1.5 ring-1 ring-inset ring-gray-300 focus-within:z-10 focus-within:ring-2 focus-within:ring-accent-600">
              <label
                htmlFor="message"
                className="block text-xs font-medium text-gray-900">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                >
              </textarea>
            </div>
          </div>
          <div className={locations.length === 1 ? "hidden" : ""}>
            <p className="text-sm font-medium">How would you like to meet?</p>
            <fieldset className="mt-2">
              <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-4">
                {locations.map((location) => (
                  <div key={location.value} className="flex items-center">
                    <input
                      id={location.value}
                      aria-label={location.name}
                      name="location"
                      type="radio"
                      value={location.value}
                      defaultChecked={location.value === locations[0].value}
                      className="h-4 w-4 border-gray-300 text-accent-600 focus:ring-accent-600"
                    />
                    <label
                      htmlFor={location.value}
                      className="ml-1.5 block text-sm leading-6 text-gray-800">
                      {location.name}
                    </label>
                  </div>
                  ))}
              </div>
            </fieldset>
          </div>
        </div>
        {modal === "error" && (
          <div className="bg-red-50 text-red-600">
            There was an error submitting your request.
          </div>
        )}
        <div className="mt-5 sm:mt-4 flex flex-row justify-end items-start">
          <button
            type="submit"
            disabled={modal === "busy"}
            className="inline-flex justify-center rounded-md bg-am-red px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-80 sm:mr-0 sm:ml-2 sm:w-auto disabled:opacity-50">
            {modal === "busy" ? (
              <>
                Submitting ... <Spinner className="ml-2" />
              </>
            ) : (
              <>Submit</>
            )}
          </button>
          <button
            type="button"
            className="inline-flex justify-center rounded-md bg-am-mid-grey ml-2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-am-mid-grey-light sm:mt-0 sm:w-auto"
            onClick={() => {
              dispatch({ type: "SET_MODAL", payload: "closed" })
            }}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

/**
 *
 * Handles form submissions by intercepting the native event,
 * passing params to the `/book` endpoint, and redirecting
 * upon success (or showing a failure message).
 *
 */
function handleSubmit(
  event: FormEvent<HTMLFormElement>,
  dispatch: Dispatch<ActionType>,
  router: AppRouterInstance
) {
  event.preventDefault()
  dispatch({ type: "SET_MODAL", payload: "busy" })
  fetch(`/api/request`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(new FormData(event.currentTarget))),
  })
    .then(async (data) => {
      const json = await data.json()
      if (json.success) {
        router.push("/confirmation")
      } else {
        dispatch({ type: "SET_MODAL", payload: "error" })
      }
    })
    .catch(() => {
      dispatch({ type: "SET_MODAL", payload: "error" })
    })
}
