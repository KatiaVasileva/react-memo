import { createContext, useState } from "react";

export const SimpleModeContext = createContext();

const SimpleModeProvider = ({ children }) => {
  const [isSimple, setIsSimple] = useState(false);

  return <SimpleModeContext.Provider value={{ isSimple, setIsSimple }}>{children}</SimpleModeContext.Provider>;
};

export default SimpleModeProvider;
