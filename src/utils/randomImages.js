import { images } from 'src/theme';
import { getTimeOfDay } from './timeOfDay';
import { randomChoice } from './randomize';

export const getBackground = () => {
  const time = getTimeOfDay();
  const currentDate = new Date();
  const currentHour = currentDate.getHours();
  let backgroundImage = images.defaultDay1;
  
  const isDay = currentHour >= 6 && currentHour < 19;
  
  if (isDay) {
    backgroundImage = randomChoice([images.defaultDay1, images.defaultDay2]);
  } else {
    backgroundImage = randomChoice([images.n1, images.n2, images.n3]);
  }
  
  if (time === 'dawn') {
    backgroundImage = randomChoice([images.d1, images.d2]);
  } else if (time === 'morning') {
    backgroundImage = randomChoice([images.m1, images.m2]);
  } else if (time === 'lunch') {
    backgroundImage = randomChoice([images.l1, images.l2, images.defaultDay1]);
  } else if (time === 'afternoon') {
    backgroundImage = randomChoice([images.a2, images.defaultDay1]);
  } else if (time === 'evening') {
    backgroundImage = randomChoice([images.e1, images.e2]);
  } else if (time === 'night') {
    backgroundImage = randomChoice([images.n1, images.n2, images.n3]);
  } else if (time === 'special') {
    backgroundImage = randomChoice([images.special]); // fetch remotely
  }

  return backgroundImage;
};

export const getFavesImage = () => randomChoice([images.fav1, images.fav2, images.fav3]);
