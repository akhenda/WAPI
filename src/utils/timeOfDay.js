export const getTimeOfDay = () => {
  let time = 'morning';
  const isHoliday = false; // we'll handle this later. probably query the API to get Holiday details
  const currentHour = new Date().getHours();

  if (currentHour >= 4 && currentHour < 7) {
    time = 'dawn';
  } else if (currentHour >= 7 && currentHour < 11) {
    time = 'morning';
  } else if (currentHour >= 11 && currentHour < 13) {
    time = 'lunch';
  } else if (currentHour >= 13 && currentHour < 16) {
    time = 'afternoon';
  } else if (currentHour >= 16 && currentHour < 19) {
    time = 'evening';
  } else if (currentHour >= 19 || currentHour < 4) {
    time = 'night';
  }

  return isHoliday ? 'special' : time;
};
