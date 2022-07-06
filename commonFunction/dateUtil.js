// adding days in Date (return date in milisecond)
module.exports.calcNextMonthDate = (date, day) => {
    // current date
    const currDate = new Date();
    // removing time from currDate
    const currDateMili = currDate.setHours(0, 0, 0, 0);
    // calculate oustanding date
    var outstandingDate = new Date(+ date);
    outstandingDate.setDate(outstandingDate.getDate() + day);
    var nextDate = outstandingDate.getTime();
    // calculate days of diff between current date and next month date
    const dayInMilli = (currDateMili - nextDate);
    const diffDays = Math.floor(dayInMilli / (1000 * 3600 * 24));
    // Return true -> If diffDays is 0 & greater than 0 , else false ('-')
    const isDue = diffDays >= 0 ? true : false;
    return { isValid: isDue, nextDate: nextDate };
}