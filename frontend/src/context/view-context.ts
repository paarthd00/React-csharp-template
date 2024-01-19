import { createContext } from "react";

export const ViewContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(["home", () => null]);
