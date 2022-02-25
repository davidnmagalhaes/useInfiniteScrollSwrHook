import React, { useState } from 'react';

export const Context = React.createContext({});

export const Provider = ({ value, children }) => {
  const [scrollParams, setScrollParams] = useState({
    mutate: false,
    lastPage: null,
  });

  const values = {
    scrollParams: scrollParams,
    setScrollParams: setScrollParams,
  };

  return (
    <Context.Provider value={(value = values)}>
      {children}
    </Context.Provider>
  );
};
