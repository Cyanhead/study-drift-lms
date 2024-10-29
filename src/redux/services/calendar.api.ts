import { CalendarEvent } from "@/models/calendar.model"
import { api } from "./api"

export const calendarApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCalendarEvents: build.query<CalendarEvent[], void>({
      query: () => "calendar/events",
      providesTags: ["Events"],
    }),
  }),
})

export const { useGetCalendarEventsQuery } = calendarApi