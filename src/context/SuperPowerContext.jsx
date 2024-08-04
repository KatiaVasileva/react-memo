import { createContext, useState } from "react";

export const SuperPowerContext = createContext();

const SuperPowerProvider = ({ children }) => {
  const [isInsightUsed, setIsInsightUsed] = useState(false);

  return (
    <SuperPowerContext.Provider value={{ isInsightUsed, setIsInsightUsed }}>{children}</SuperPowerContext.Provider>
  );
};

export default SuperPowerProvider;
