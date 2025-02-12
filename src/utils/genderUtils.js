import GENDER from '../constants/enum/gender';

export const getTranslatedGenders = (genders) => genders.map((gender) => GENDER[gender].value);
