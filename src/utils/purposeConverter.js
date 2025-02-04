const purposeParam = {
  WORKSHOP: '워크샵',
  SPORTS_DAY: '체육대회',
  MT: 'MT',
  GATHERING: '모임',
  RETREAT: '수련회',
};
export default function purposeConverter(label) {
  return purposeParam[label];
}
