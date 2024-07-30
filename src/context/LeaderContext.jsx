import { createContext, useState } from "react";

export const LeaderContext = createContext();

const LeaderProvider = ({ children }) => {
  const [leaders, setLeaders] = useState([]);

  return <LeaderContext.Provider value={{ leaders, setLeaders }}>{children}</LeaderContext.Provider>;
};

export default LeaderProvider;
