import {
  DONE_APP_INTRO,
  APP_FIELD_CHANGED,
  DONE_SURVEY,
} from 'src/state/types';


export const doneAppIntro = () => {
  return { type: DONE_APP_INTRO };
};

export const appFieldChanged = ({ prop, value }) => {
  return {
    type: APP_FIELD_CHANGED,
    payload: { prop, value },
  };
};

export const doneSurvey = () => {
  return { type: DONE_SURVEY };
};
