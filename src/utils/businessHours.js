const moment = require('moment');
const OpeningTimes = require('moment-opening-times');


const sanitizeOpeningTimes = (openingTimes) => {
  let sanitizedOpeningTimes = {};
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]; 

  days.forEach((day) => {
    const siku = day.toLowerCase();
    let times = [{ opens: '00:00', closes: '00:00' }];

    if (Object.keys(openingTimes).includes(day)) {
      times = [{
        opens: openingTimes[day].open,
        closes: openingTimes[day].close,
      }];
    }

    sanitizedOpeningTimes = Object.assign({}, sanitizedOpeningTimes, { [siku]: times });
  });

  return sanitizedOpeningTimes;
};

export const openStatus = (openingTimes) => {
  if (!openingTimes) return false;
  const now = moment();
  const times = sanitizeOpeningTimes(openingTimes);
  const openingTimesMoment = new OpeningTimes(times, 'Africa/Nairobi');

  return openingTimesMoment.getStatus(now);
};
