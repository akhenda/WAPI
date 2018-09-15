import { XmlEntities } from 'html-entities';


const entities = new XmlEntities();

export const stripHTML = (str) => {
  return entities.decode(str.replace(/<\/?[^>]+(>|$)/g, ''));
};
