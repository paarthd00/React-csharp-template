export type Milk = {
  id: number;
  type: string;
  rating: number;
  createdAt: string;
};

export async function getMilks() {
  const result = await fetch("/api/Milks");
  return await result.json();
}

export async function deleteMilk(id: number) {
  await fetch(`/api/Milks/${id}`, { method: "DELETE" });
}
