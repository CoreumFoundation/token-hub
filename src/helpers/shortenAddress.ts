export const shortenAddress = (value: string) => {
  if (value.length <= 16) {
    return value;
  }

  return value.substring(0, 10) + "..." + value.substring(value.length - 6);
};
