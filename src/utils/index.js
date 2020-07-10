export const getShortString = (length, str) => {
  if (!str) {
    return "...";
  }
  const maxLen = length;
  const strLen = str.length;
  const newString = str.substr(0, maxLen);
  return `${newString}${strLen > maxLen ? "..." : ""}`;
};

export const isValidImage = (url) => {
  return /.(jpeg|jpg|png|gif)\b/g.test(url);
};
