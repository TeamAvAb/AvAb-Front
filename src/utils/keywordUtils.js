import KEYWORD from '../constants/keyword';

export const getTranslatedKeywords = (keywords) => keywords.map((keyword) => KEYWORD[keyword]);
