import { useContext } from 'react';

import { GlobalModalContext } from '../context/GlobalModalContext';

export const useGlobalModalContext = () => {
  const context = useContext(GlobalModalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalModalContext() must be used inside a <GlobalModalProvider />'
    );
  }
  return context;
};
