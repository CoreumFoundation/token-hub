import { useConnectedAccount } from '@/hooks/useAccount';
import { useAccountBalances } from '@/hooks/useBalances';
import { useChains } from '@/hooks/useChains';
import { useCurrencies } from '@/hooks/useCurrencies';
import { useCurrentNetwork } from '@/hooks/useCurrentNetwork';
import { FC } from 'react';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  useChains();
  useConnectedAccount();
  useCurrencies();
  useAccountBalances();
  useCurrentNetwork();

  return children;
};
