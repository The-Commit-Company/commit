import moment from "moment"
import { Moment } from "moment-timezone"

/**
 * Converts a Frappe timestamp to a readable time ago string
 * @param timestamp A frappe timestamp string in the format YYYY-MM-DD HH:mm:ss
 * @param withoutSuffix remove the suffix from the time ago string
 * @returns 
 */
export const convertFrappeTimestampToTimeAgo = (timestamp?: string, withoutSuffix?: boolean) => {

    if (timestamp) {
        const date = convertFrappeTimestampToUserTimezone(timestamp)

        return date.fromNow(withoutSuffix)
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