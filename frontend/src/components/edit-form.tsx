import React from "react";
import { MilkContext, SelectedMilkContext } from "@/context/milk-context";
import { ViewContext } from "@/context/view-context";
import { Button } from "./ui/button";

export default function EditForm() {
    const [, setMilks] = React.useContext(MilkContext);
    const [selectedMilk, setSelectedMilk] = React.useContext(SelectedMilkContext);
    const [, setView] = React.useContext(ViewContext);
    const [type, setType] = React.useState(selectedMilk?.type);
    const [rating, setRating] = React.useState(selectedMilk?.rating);

    const handleEditMilk = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!type || !rating || !selectedMilk) {
            alert("Please fill out all fields")
            return
        }

        let newMilk = selectedMilk; newMilk.type = type; newMilk.rating = rating;

        try {
            await fetch(`api/milks/${selectedMilk?.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newMilk),
            })

            setMilks((milks) => milks.map((milk) => (milk.id === selectedMilk?.id ? newMilk : milk)));
            setSelectedMilk(null);
            setView("home");
        } catch (error) {
            alert("Error editing milk");
            console.log(error);
        }
    }

    return (
        <div className="pt-4">
            <form className="flex" onSubmit={handleEditMilk}>
                <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                <input min={0} type="number" value={rating} onChange={(e) => {
                    if (e.target.value === "") {
                        setRating(0)
                        return
                    }
                    setRating(parseInt(e.target.value))
                }} />
                <Button type="submit">Edit</Button>
            </form>
        </div>
    );
}
