export const trimText = (val, charLength) => {
  let valength = val.split("");
  let length = charLength;
  let trimVal =
    val.substring(0, length) + (valength.length < length ? "" : "...");
  return trimVal;
};
