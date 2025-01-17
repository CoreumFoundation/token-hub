export const isValidTokenDenom = (denom: string): boolean => {
  const ibcRegex = /^ibc\/[a-fA-F0-9]{64}$/;
  const ftRegex = /^[a-zA-Z0-9._/-]+-[a-zA-Z0-9]{39}$/;

  return ibcRegex.test(denom) || ftRegex.test(denom);
};
