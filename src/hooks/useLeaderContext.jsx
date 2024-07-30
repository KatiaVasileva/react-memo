import { useContext } from "react";
import { LeaderContext } from "../context/LeaderContext";

export function useLeaderContext() {
  return useContext(LeaderContext);
}
