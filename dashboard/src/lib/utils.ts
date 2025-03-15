import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment, { Moment } from "moment-timezone"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertStringDateToMoment = (date: string) => {
  if (date) {
    return moment(date, 'YYYY/MM/DD')
  }
  return null
}

export const convertFrappeTimestampToReadableDate = (timestamp?: string, format = 'MM-DD-YYYY') => {
  if (timestamp) {
    return moment(timestamp, 'YYYY-MM-DD HH:mm:ss').format(format)
  }
  return ''
}

/**
 * Converts a Frappe date to a readable time ago string
 * @param date A frappe date string in the format YYYY-MM-DD
 * @param withoutSuffix remove the suffix from the time ago string
 * @returns 
 */
export const convertFrappeDateStringToTimeAgo = (date?: string, withoutSuffix?: boolean) => {
  if (date) {
    const userDate = convertFrappeTimestampToUserTimezone(date)
    return userDate.fromNow(withoutSuffix)
  }
  return ''
}

export const convertFrappeTimestampToUserTimezone = (timestamp: string): Moment => {
  // @ts-ignore
  const systemTimezone = window.frappe?.boot?.time_zone?.system
  // @ts-ignore
  const userTimezone = window.frappe?.boot?.time_zone?.user

  if (systemTimezone && userTimezone) {
    return moment.tz(timestamp, systemTimezone).clone().tz(userTimezone)
  } else {
    return moment(timestamp)
  }
}
