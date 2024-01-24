import { useState } from "react";
import { Milk } from "../network";
import { MilkContext, SelectedMilkContext } from "../context/milk-context";
import MilkList from "../components/list";

export const component = function Home() {
  const [milks, setMilks] = useState<Milk[]>([]);
  const [selectedMilk, setSelectedMilk] = useState<Milk | null>(null);

  return (
      <MilkContext.Provider value={[milks, setMilks]}>
        <SelectedMilkContext.Provider value={[selectedMilk, setSelectedMilk]}>
          <div className="m-4">
            <MilkList />
          </div>
        </SelectedMilkContext.Provider>
      </MilkContext.Provider>
  );
}
