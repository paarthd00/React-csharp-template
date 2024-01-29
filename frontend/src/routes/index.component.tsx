import { deleteMilk, Milk } from "@/network";
import { queryClient } from "@/main";
import { useQuery, useMutation } from "@tanstack/react-query";

export const component = function Home() {
  // Make sure to keep the query and mutation before any return statement lol

  let { isPending, error, data } = useQuery({
    queryKey: ['milkData'],
    queryFn: () =>
      fetch('/api/Milks').then((res) =>
        res.json(),
      ),
  })
  
  const deleteMilkMutation = useMutation({
    mutationFn: deleteMilk,
    onSettled: () => queryClient.invalidateQueries({ "queryKey": ["milkData"] })
  });

  if (isPending) return <div>Loading...</div>

  if (error) return <div>Something went wrong</div>

  return (
    <div className="py-10 container">
      {data?.map((milk: Milk) => (
        <div key={milk.id}>
          <h2 className="text-2xl">{milk.type}</h2>
          <p>Rating: {milk.rating}</p>
          <p>Created At: {milk.createdAt}</p>

          <div className="flex gap-2">
            <button
              onClick={() => { deleteMilkMutation.mutate(milk.id) }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
            <button
              onClick={() => {
                // setView("edit");
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
