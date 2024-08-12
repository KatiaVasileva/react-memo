import { createContext, useState } from "react";

export const SuperPowerContext = createContext();

const SuperPowerProvider = ({ children }) => {
  const [isInsightUsed, setIsInsightUsed] = useState(false);
  const [isAlohomoraUsed, setIsAlohomoraUsed] = useState(false);

  return (
    <SuperPowerContext.Provider value={{ isInsightUsed, setIsInsightUsed, isAlohomoraUsed, setIsAlohomoraUsed }}>
      {children}
    </SuperPowerContext.Provider>
  );
};

export default SuperPowerProvider;
