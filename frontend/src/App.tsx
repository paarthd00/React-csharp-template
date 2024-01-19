import { useState } from "react";
import { Milk } from "./network";
import { MilkContext, SelectedMilkContext } from "./context/milk-context";
import MilkList from "./components/list";
import AddForm from "./components/add-form";
import { ViewContext } from "./context/view-context";
import { Button } from "./components/ui/button";
import EditForm from "./components/edit-form";

export default function App() {
  const [milks, setMilks] = useState<Milk[]>([]);
  const [view, setView] = useState("home");
  const [selectedMilk, setSelectedMilk] = useState<Milk | null>(null);

  return (
    <ViewContext.Provider value={[view, setView]}>
      <MilkContext.Provider value={[milks, setMilks]}>
        <SelectedMilkContext.Provider value={[selectedMilk, setSelectedMilk]}>
          <div className="m-4">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setView("home")
                }}>
                Home
              </Button>
              <Button
                onClick={() => {
                  setView("add")
                }}>
                Add
              </Button>
            </div>
            {
              view == "home"
                ? <MilkList />
                : view == "add" ? <AddForm />
                  : view == "edit" ? <EditForm />
                    : <> </>
            }
          </div>
        </SelectedMilkContext.Provider>
      </MilkContext.Provider>
    </ViewContext.Provider>
  );
}
