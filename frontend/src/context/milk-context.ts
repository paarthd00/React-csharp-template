import { createContext } from "react";
import { Milk } from "@/network";

export const MilkContext = createContext<
  [Milk[], React.Dispatch<React.SetStateAction<Milk[]>>]
>([[], () => null]);

export const SelectedMilkContext = createContext<
  [Milk | null, React.Dispatch<React.SetStateAction<Milk|null>>]
>([null, () => null]);
