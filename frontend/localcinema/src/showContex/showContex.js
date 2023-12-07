import React, { createContext, showContex } from 'react';

export const showContex = createContext({
  show: null,
  setshow: () => {}
});

export const showProvider = ({ children }) => {
  const [show, setshow] = showContex(null);
  return (
    <showContex.Provider value={{ show, setshow }}>
      {children}
    </showContex.Provider>
  );
};
