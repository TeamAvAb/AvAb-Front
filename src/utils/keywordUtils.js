import KEYWORD from '../constants/enum/keyword';

export const getTranslatedKeywords = (keywords) =>
  keywords.map((keyword) => KEYWORD[keyword].value);
