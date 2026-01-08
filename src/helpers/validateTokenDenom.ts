import { SUBUNITS_REGEX } from "@/constants";
import { validateAddress } from "./validateAddress";
import { ChainInfo } from "@/shared/types";

const ibcRegex = /^ibc\/[a-fA-F0-9]{64}$/;

export const isValidTokenDenom = (denom: string, chainInfo: ChainInfo | undefined): boolean => {
  if (denom.startsWith('ibc/')) {
    return ibcRegex.test(denom);
  }

  const parsedDenom = denom.split('-');
  const [subunits, accountAddress] = parsedDenom;

  const subunitsValid = SUBUNITS_REGEX.test(subunits);
  const accountAddressValid = validateAddress(accountAddress);

  if (!accountAddressValid.result || accountAddressValid.prefix !== chainInfo?.bech32Prefix) {
    return false;
  }

  return subunitsValid;
};
