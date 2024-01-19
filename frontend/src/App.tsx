import { useState } from "react";
import { Milk } from "./network";
import { MilkContext } from "./context/milk-context";
import MilkList from "./components/list";
import AddForm from "./components/add-form";

export default function App() {
  const [milks, setMilks] = useState<Milk[]>([]);
  const [view, setView] = useState("home");

  return (
    <MilkContext.Provider value={[milks, setMilks]}>
      <div className="m-4">

        <div className="flex gap-2">
          <button
            onClick={() => {
              setView("home")
            }}
            className="bg-black rounded text-white px-2 py-1">
            Home
          </button>
          <button
            onClick={() => {
              setView("add")
            }}
            className="bg-black rounded text-white px-2 py-1">
            Add
          </button>
        </div>
        {
          view == "home"
            ? <MilkList />
            : view == "add" ? <AddForm />
              : <></>
        }
      </div>
    </MilkContext.Provider>
  );
}
