import { useConnectedAccount } from '@/hooks/useAccount';
import { useChains } from '@/hooks/useChains';
import { FC } from 'react';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: FC<AppProviderProps> = ({ children }) => {
  useChains();
  useConnectedAccount();

  return children;
};
