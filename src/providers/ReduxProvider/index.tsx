import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { FC } from 'react';

interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider: FC<ReduxProviderProps> = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
