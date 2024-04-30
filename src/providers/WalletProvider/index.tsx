import { FC } from "react";
import { ConfigureGrazArgs, GrazProvider } from "graz";
import { coreum, coreumtestnet } from 'graz/chains';

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: FC<WalletProviderProps> = ({
  children,
}) => {
  const grazOptions: ConfigureGrazArgs = {
    chains: [coreum, coreumtestnet],
    autoReconnect: true,
  };

  return (
    <GrazProvider grazOptions={grazOptions}>
      {children}
    </GrazProvider>
  );
};
