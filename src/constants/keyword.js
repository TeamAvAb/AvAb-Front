export const KEYWORD = {
  QUICKNESS: '순발력',
  SENSIBLE: '센스',
  COOPERATIVE: '창의력',
  ACTIVE: '협동',
  BRAIN: '액티브',
  PSYCHOLOGICAL: '두뇌',
  LUCK: '심리',
  COMMON_SENSE: '행운',
  PREPARATION: '상식',
};

export const getTranslatedKeywords = (keywords) => keywords.map((keyword) => KEYWORD[keyword]);
