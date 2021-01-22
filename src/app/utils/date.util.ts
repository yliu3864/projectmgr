
import {
 
    differenceInYears,
    parseISO,
    isValid,
    isFuture,
    isDate,
  } from 'date-fns'


export const isValidDate = (dateStr: string) => {
    const date = parseISO(dateStr);
    return isValid(date);
}