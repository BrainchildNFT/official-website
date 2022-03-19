import React, { createContext, ReactNode, useState } from 'react';


const defaultContextValue = {
  wallet: 'testWallet',
  lang: 'en',
  updateWallet: (account: any) => {
  },
};

export const AppContext = createContext(defaultContextValue);

type Props = {
  children: ReactNode;
}

export function AppProvider({children}: Props) {
  const [wallet, setWallet] = useState('');
  const [lang, setLang] = useState('');
  const updateWallet = (account: any) => {
    setWallet(account);
  };

  const value = {
    wallet,
    lang,
    updateWallet,
  };

  return (<>
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  </>);
}

