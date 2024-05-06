import { MANAGE_FT_TOKENS_TABS } from "@/constants";
import { TabItem, Token } from "@/shared/types";

export const getManageFTTabs = (currency: Token | null) => {
  if (!currency || !currency?.features) {
    return [];
  }

  const { features } = currency;
  let resultTabs: TabItem[] = [];

  for (const feature of features) {
    if (resultTabs.length === 3) {
      break;
    }

    switch (feature) {
      case 'minting':
      case 'freezing':
      case 'whitelisting':
        resultTabs.push(MANAGE_FT_TOKENS_TABS[feature]);
        break;
      default:
        break;
    }
  }

  return resultTabs;
}

export const getFTCurrencyOptions = (currency: Token) => {
  const { features } = currency;
  let isBurnEnabled = false;
  let isTokenManageable = false;

  if (!features?.length) {
    return [false, false];
  }

  for (const feature of features) {
    if (isTokenManageable && isBurnEnabled) {
      break;
    }

    switch (feature) {
      case 'minting':
      case 'freezing':
      case 'whitelisting':
        isTokenManageable = true;
      case 'burning':
        isBurnEnabled = true;
        break;
      default:
        break;
    }
  }

  return [isBurnEnabled, isTokenManageable];
}
