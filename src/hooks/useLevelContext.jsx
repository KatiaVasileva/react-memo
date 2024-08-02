import { useContext } from "react";
import { LevelContext } from "../context/LevelContext";

export function useLevelContext() {
  return useContext(LevelContext);
}
