import AGE from '../constants/enum/age';

export const getTranslatedAges = (ages) => ages.map((age) => AGE[age].value);
