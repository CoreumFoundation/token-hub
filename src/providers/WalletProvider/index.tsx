import { FC } from "react";
import { ConfigureGrazArgs, defineChainInfo, GrazProvider } from "graz";
import { coreum, coreumtestnet,  } from 'graz/chains';

interface WalletProviderProps {
  children: React.ReactNode;
}

export const coreumdevnet = defineChainInfo({
  chainId: "coreum-devnet-1",
  currencies: [
    {
      coinDenom: "devcore",
      coinMinimalDenom: "udevcore",
      coinDecimals: 6,
      coinGeckoId: "coreum"
    }
  ],
  rest: "https://full-node-pluto.devnet-1.coreum.dev:1317",
  rpc: "https://full-node-pluto.devnet-1.coreum.dev:26657",
  bech32Config: {
    bech32PrefixAccAddr: "devcore",
    bech32PrefixAccPub: "devcorepub",
    bech32PrefixValAddr: "devcorevaloper",
    bech32PrefixValPub: "devcorevaloperpub",
    bech32PrefixConsAddr: "devcorevalcons",
    bech32PrefixConsPub: "devcorevalconspub"
  },
  chainName: "coreumdevnet",
  feeCurrencies: [
    {
      coinDenom: "devcore",
      coinMinimalDenom: "udevcore",
      coinDecimals: 6,
      coinGeckoId: "coreum",
      gasPriceStep: {
        low: 0.0625,
        average: 0.0625,
        high: 62.5
      }
    }
  ],
  stakeCurrency: {
    coinDenom: "devcore",
    coinMinimalDenom: "udevcore",
    coinDecimals: 6,
    coinGeckoId: "coreum"
  },
  bip44: {
    coinType: 990
  }
});

export const WalletProvider: FC<WalletProviderProps> = ({
  children,
}) => {
  const grazOptions: ConfigureGrazArgs = {
    chains: [coreum, coreumtestnet, coreumdevnet],
    autoReconnect: true,
  };

  return (
    <GrazProvider grazOptions={grazOptions}>
      {children}
    </GrazProvider>
  );
};
