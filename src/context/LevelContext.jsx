import { createContext, useState } from "react";

export const LevelContext = createContext();

const LevelProvider = ({ children }) => {
  const [level, setLevel] = useState(1);

  return <LevelContext.Provider value={{ level, setLevel }}>{children}</LevelContext.Provider>;
};

export default LevelProvider;
