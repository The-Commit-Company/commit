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