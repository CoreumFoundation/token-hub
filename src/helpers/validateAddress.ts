import { bech32 } from "bech32";

export const validateAddress = (address: string) => {
  try {
    const decodedAddress = bech32.decode(address);
    const { prefix, words } = decodedAddress;

    if ((prefix && words.length === 32) || words.length === 52) {
      return { prefix, result: true };
    }
  } catch (error) {
    // Invalid address or decoding error
  }
  return { prefix: '', result: false };
};
