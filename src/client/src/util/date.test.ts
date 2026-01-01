import { describe, it, expect } from 'vitest'
import { toFullDateString, stringifyDate, parseDateString, addDaysToDate, getTodaysDate, getTodaysDateString } from './date'

describe('date util', () => {
    it('toFullDateString returns formatted string for a date', () => {
        expect(toFullDateString('2023-01-02')).toBe('January 2, 2023')
        expect(toFullDateString('2020-02-01')).toBe('February 1, 2020')
    })

    it('toFullDateString returns empty string for null/undefined', () => {
        expect(toFullDateString(null)).toBe('')
        expect(toFullDateString(undefined)).toBe('')
    })

    it('stringifyDate pads month and day and returns YYYY-MM-DD', () => {
        const d = new Date(2023, 0, 2) // Jan 2, 2023
        expect(stringifyDate(d)).toBe('2023-01-02')

        const d2 = new Date(2023, 9, 11) // Oct 11, 2023
        expect(stringifyDate(d2)).toBe('2023-10-11')
    })

    it('addDaysToDate returns new date offset by days and does not mutate original', () => {
        const original = parseDateString('2023-01-10')
        const added = addDaysToDate(original, 5)
        expect(stringifyDate(added)).toBe('2023-01-15')
        // original should be unchanged
        expect(stringifyDate(original)).toBe('2023-01-10')

        const sub = addDaysToDate(original, -3)
        expect(stringifyDate(sub)).toBe('2023-01-07')
    })

    it('getTodaysDate and getTodaysDateString reflect today (UTC-insensitive string)', () => {
        const today = new Date()
        expect(stringifyDate(getTodaysDate())).toBe(stringifyDate(today))
        expect(getTodaysDateString()).toBe(stringifyDate(today))
    })
})
