import React from "react";
import { MilkContext, SelectedMilkContext } from "@/context/milk-context";
import { ViewContext } from "@/context/view-context";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { formSchema } from "@/lib/validation";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { updateMilk } from "@/network";

export default function EditForm() {
    const [, setMilks] = React.useContext(MilkContext);
    const [selectedMilk, setSelectedMilk] = React.useContext(SelectedMilkContext);
    const [, setView] = React.useContext(ViewContext);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: selectedMilk?.type,
            rating: selectedMilk?.rating,
        },
    })

    const handleEditMilk = async (values: z.infer<typeof formSchema>) => {
        const { type, rating } = values;

        if (!type || !rating || !selectedMilk) {
            alert("Please fill out all fields")
            return
        }

        let newMilk = selectedMilk; newMilk.type = type; newMilk.rating = rating;

        try {
            await updateMilk(selectedMilk?.id, newMilk);
            setMilks((milks) => milks.map((milk) => (milk.id === selectedMilk?.id ? newMilk : milk)));
            setSelectedMilk(null);
            setView("home");
        } catch (error) {
            alert("Error editing milk");
            console.log(error);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleEditMilk)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the type of milk you are rating
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rating</FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    {...field}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        // Parse the input value as a number
                                        field.onChange(value !== '' ? Number(value) : undefined);
                                    }}
                                />
                            </FormControl>
                            <FormDescription>
                                Please enter a number between 0 and 5 for the rating.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
