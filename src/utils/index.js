export const getShortString = (str) => {
  if (!str) {
    return "...";
  }
  const maxLen = 40;
  const strLen = str.length;
  const newString = str.substr(0, maxLen);
  return `${newString}${strLen > maxLen ? "..." : ""}`;
};