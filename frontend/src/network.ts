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

export async function createMilk(type: string, rating: number) {
  const milk = await fetch("/api/milks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ type, rating }),
  }).then((response) => response.json());
  return milk;
}

export async function updateMilk(id: number, newMilk: Milk) {
  await fetch(`api/milks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newMilk),
  });
}
