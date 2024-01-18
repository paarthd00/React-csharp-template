import { useEffect, useState } from "react";
import { getMilks, Milk, deleteMilk } from "./network";

export default function App() {
  const [milks, setMilks] = useState<Milk[]>([]);

  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function fetchMilks() {
      try {
        const milks = await getMilks();
        setMilks(milks);
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        alert("Error fetching milks");
      }
    }

    fetchMilks();
  }, []);

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
    } catch (error) {
      alert("Error creating milk");
    }
  };

  const handleOnDelete = async (i: number) => {
    try {
      await deleteMilk(i);
      setMilks((milks) => milks.filter((milk) => milk.id !== i));
    } catch (error) {
      alert("Error deleting milk");
      console.log(error);
    }

    return {};
  };

  return (
    <div className="m-4">
      <h1 className="text-4xl mb-10">Milks</h1>
      {milks.map((milk, i) => (
        <div key={milk.id}>
          <h2 className="text-2xl">{milk.type}</h2>
          <p>Rating: {milk.rating}</p>
          <p>Created At: {milk.createdAt}</p>
          <button
            onClick={() => {
              handleOnDelete(milk.id);
            }}
            className=""
          >
            Delete
          </button>
          <button className=""></button>
        </div>
      ))}

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
    </div>
  );
}
