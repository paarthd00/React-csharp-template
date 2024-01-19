import React, { useEffect } from "react";
import { MilkContext } from "@/context/milk-context";
import { getMilks, deleteMilk } from "@/network";
export default function MilkList() {
    const [milks, setMilks] = React.useContext(MilkContext);

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
        <>
            <h1 className="text-4xl mb-10">Milks</h1>
            {milks.map((milk) => (
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
        </>
    )
}
