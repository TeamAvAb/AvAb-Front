import PURPOSE from '../constants/enum/purpose';

export const getTranslatedPurposes = (purposes) =>
  purposes.map((purpose) => PURPOSE[purpose].value);
