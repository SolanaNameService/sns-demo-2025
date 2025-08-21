"use client";

import { createContext, useContext, useState } from "react";

type NetWorthContextValue = {
  netWorth: number;
  setNetWorth: React.Dispatch<React.SetStateAction<number>>;
};

const NetWorthContext = createContext<NetWorthContextValue | null>(null);

export const NetWorthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [netWorth, setNetWorth] = useState(0);

  return (
    <NetWorthContext.Provider value={{ netWorth, setNetWorth }}>
      {children}
    </NetWorthContext.Provider>
  );
};

export const useNetWorth = () => {
  const ctx = useContext(NetWorthContext);
  if (!ctx) {
    throw new Error("useNetWorth must be used within <NetWorthProvider>");
  }
  return ctx;
};
