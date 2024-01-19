import { createContext } from "react";
import { Milk } from "@/network";
export const MilkContext = createContext<
  [Milk[], React.Dispatch<React.SetStateAction<Milk[]>>]
>([[], () => null]);
