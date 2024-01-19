import React, { useState } from "react";
import { MilkContext } from "@/context/milk-context";
import { ViewContext } from "@/context/view-context";
export default function AddForm() {
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [, setMilks] = React.useContext(MilkContext);
  const [, setView] = React.useContext(ViewContext);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const milk = await fetch("/api/milks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ type, rating }),
      }).then((response) => response.json());
      setMilks((milks) => [...milks, milk]);
      setView("home");
    } catch (error) {
      alert("Error creating milk");
    }
  };

  return (
    <form className="mt-10 flex flex-col" onSubmit={handleSubmit}>
      <label className="block mb-2">Type</label>
      <input
        className="border border-gray-400 rounded px-2 py-1 mb-4"
        type="text"
        placeholder="Type"
        value={type}
        onChange={(event) => setType(event.target.value)}
      />

      <label className="block mb-2">Rating</label>
      <input
        className="border border-gray-400 rounded px-2 py-1 mb-4"
        type="number"
        placeholder="Rating"
        value={rating}
        onChange={(event) => setRating(Number(event.target.value))}
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Create
      </button>
    </form>
  )
}
