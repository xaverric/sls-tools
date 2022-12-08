/**
 * Returns current date in YYYY-MM-DD format
 *
 * @returns {string}
 */
const currentDate = () => {
    return formatDate(new Date());
}

const currentDateWithTime = () => {
    return formatDateWithTime(new Date());
}

/**
 * Returns date in YYYY-MM-DD format based on the provided {@link Date} object
 *
 * @returns {string}
 */
const formatDate = date => {
    return [
        date.getFullYear(),
        _padTo2Digits(date.getMonth() + 1),
        _padTo2Digits(date.getDate()),
    ].join('-');
}

const formatDateWithTime = date => {
    let yyyymmdd = [
        date.getFullYear(),
        _padTo2Digits(date.getMonth() + 1),
        _padTo2Digits(date.getDate()),
    ].join('-');
    let time = [
        _padTo2Digits(date.getHours()),
        "h",
        _padTo2Digits(date.getMinutes()),
        "m"
    ].join("");
    return `${yyyymmdd}_${time}`;
}

const _padTo2Digits = num => {
    return num.toString().padStart(2, '0');
}

module.exports = {
    currentDate,
    formatDate,
    currentDateWithTime
}