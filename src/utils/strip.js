export const stripHTML = (str) => {
  return str.replace(/<\/?[^>]+(>|$)/g, '');
};
