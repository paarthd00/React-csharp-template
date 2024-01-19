import * as z from "zod";
export const formSchema = z.object({
  type: z.string(),
  rating: z.number().min(0).max(5),
});
