export function toFullDateString(dateString: string | null | undefined): string {
    if (dateString) {
        return new Date(dateString + 'T00:00:00').toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
    return ''
}

/**
 * Converts date object to string
 * @param {string} date 
 * @returns {Date}
 */
export function stringifyDate(date: Date): string {
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return dateString;
}

/**
 * Parses date string into date object
 * @param {string} dateString 
 * @returns {Date}
 */
export function parseDateString(dateString: string): Date {
    const date = new Date(dateString.split('T')[0] + 'T00:00:00');
    return date;
}

/**
 * Adds number of days to a date
 * @param {Date} date 
 * @param {number} days 
 * @returns {Date}
 */
export function addDaysToDate(date: Date, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate
}

/**
 * Gets todays date as a Date object
 * @returns {Date}
 */
export function getTodaysDate(): Date {
    const date = new Date();
    return parseDateString(stringifyDate(date));
}

/**
 * Gets todays date as a string
 * @returns {string}
 */
export function getTodaysDateString(): string {
    return stringifyDate(getTodaysDate());
}