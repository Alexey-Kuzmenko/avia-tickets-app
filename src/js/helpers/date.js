import { format } from 'date-fns';

function changeDateFormat(date) {
    const [year, month, day] = date.split('-');
    const newDateFormat = `${year}-${month}`;
    return newDateFormat;
}

/**
 * * @param {String} str
 * * @param {String} type - 'yyy.mmm.dd'
 */

function formatDate(str, type) {
    const date = new Date(str);
    return format(date, type);
}

export { changeDateFormat, formatDate };
