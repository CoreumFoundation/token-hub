export const getNumberRegex = (decimals = 0) => {
  if (decimals === 0) {
    return new RegExp(`^[0-9]*$`);
  }

  return new RegExp(`^-?\\d+(\\.\\d{0,${decimals}})?$`);
};
