import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import moment from "moment-timezone"


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