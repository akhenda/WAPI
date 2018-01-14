import { colors } from 'src/theme';

import { getTimeOfDay } from './timeOfDay';
import { randomChoice } from './randomize';

export const getGreeting = (name) => {
  const time = getTimeOfDay();
  let color = colors.primary.text;
  let greeting=['Welcome\nto WAPI?', 'See\nUnique', 'Explore\n& Disover'];
  const dawnGreeting = ['Good\nMorning!', 'The sun is\nbut a morning star.', `Morning,\n${name}`];
  const morningGreeting = ['May your\nday totally rock!', 'Mornin\',\nsunshine.', 'Good\nmorning.', `Morning,\n${name}`];
  const lunchGreeting = ['Have\nlunch plans?', 'Lunch\nluunnch...'];
  const afternoonGreeting = ['Good\nafternoon.', 'Have a\nwonderful afternoon.', 'Enjoy\nyour afternoon.', `Afternoon,\n${name}`];
  const eveningGreeting = ['Good\nevening.', 'Plans\nfor dinner?', `Evening,\n${name}`];
  const nightGreeting = ['What a nice\nnight for an evening', 'Have a\ngood night.', 'Good\nevening.'];
  
  if (time === 'dawn') {
    greeting = randomChoice(dawnGreeting);
  } else if (time === 'morning') {
    greeting = randomChoice(morningGreeting);
  } else if (time === 'lunch') {
    color = colors.secondary.text;
    greeting = randomChoice(lunchGreeting);
  } else if (time === 'afternoon') {
    greeting = randomChoice(afternoonGreeting);
  } else if (time === 'evening') {
    color = colors.secondary.text;
    greeting = randomChoice(eveningGreeting);
  } else if (time === 'night') {
    greeting = randomChoice(nightGreeting);
  } else if (time === 'special') {
    greeting = randomChoice(['Merry \nChristmas', 'Ho! Ho! Ho!']); // fetch remotely
  } else {
    color = colors.secondary.text;
  }
  
  return { greeting, color };
};
