import { useContext } from "react";
import { SuperPowerContext } from "../context/SuperPowerContext";

export function useSuperPowerContext() {
  return useContext(SuperPowerContext);
}
