const keywordParam = {
  COOPERATIVE: "협동",
  QUICKNESS: "순발력",
  SENSIBLE: "센스",
  BRAIN: "두뇌",
  CREATIVE: "창의력",
  ACTIVE: "액티브",
  PSYCHOLOGICAL: "심리",
  LUCK: "행운",
  COMMON_SENSE: "상식",
  PREPARATION: "준비물",
};
export default function keywordConverter(label) {
  return keywordParam[label];
}
