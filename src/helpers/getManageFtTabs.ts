import { MANAGE_FT_TOKENS_TABS } from "@/constants";
import { TabItem, Token } from "@/shared/types";

export const getManageFTTabs = (currency: Token | null) => {
  if (!currency || !currency?.features) {
    return [];
  }

  const { features } = currency;
  let resultTabs: TabItem[] = [];

  for (const feature of features) {
    switch (feature) {
      case 'minting':
      case 'whitelisting':
      case 'clawback':
      case 'dex_whitelisted_denoms':
      case 'dex_unified_ref_amount_change':
        resultTabs.push(MANAGE_FT_TOKENS_TABS[feature]);
        break;
      case 'freezing':
        resultTabs.push(MANAGE_FT_TOKENS_TABS[feature]);
        resultTabs.push(MANAGE_FT_TOKENS_TABS['unfreezing']);
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
      case 'clawback':
      case 'dex_whitelisted_denoms':
      case 'dex_unified_ref_amount_change':
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
