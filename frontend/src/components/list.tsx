import React, { useEffect } from "react";
import { MilkContext, SelectedMilkContext } from "@/context/milk-context";
import { getMilks, deleteMilk } from "@/network";
import { ViewContext } from "@/context/view-context";

export default function MilkList() {
    const [milks, setMilks] = React.useContext(MilkContext);
    const [_, setView] = React.useContext(ViewContext);
    const [selectedMilk, setSelectedMilk] = React.useContext(SelectedMilkContext);

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

    const handleOnDelete = async (i: number) => {
        try {
            await deleteMilk(i);
            setMilks((milks) => milks.filter((milk) => milk.id !== i));
        } catch (error) {
            alert("Error deleting milk");
            console.log(error);
        }
    };


    return (
        <div className="py-10">
            {milks.map((milk) => (
                <div key={milk.id}>
                    <h2 className="text-2xl">{milk.type}</h2>
                    <p>Rating: {milk.rating}</p>
                    <p>Created At: {milk.createdAt}</p>

                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                handleOnDelete(milk.id);
                            }}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                setSelectedMilk(milk);
                                setView("edit");
                            }}
                            className="bg-slate-500 text-white px-4 py-2 rounded ">
                            Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}
