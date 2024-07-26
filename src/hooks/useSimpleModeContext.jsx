import { useContext } from "react";
import { SimpleModeContext } from "../context/SimpleModeContext";

export function useSimpleModeContext() {
  return useContext(SimpleModeContext);
}
