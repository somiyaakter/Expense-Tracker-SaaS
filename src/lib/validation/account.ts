
import { z } from "zod";

export const insertAccountSchema = z.object({
  plaidId: z.string().min(1, "Account plaidId is required"),
  name: z.string().min(1, "Account name is required"),
  userId: z.string().min(1, "Account userId is required"),
});


export const updateAccountSchema = insertAccountSchema.partial();

//Types
export type InsertAccount = z.infer<typeof insertAccountSchema>;
export type UpdateAccount = z.infer<typeof updateAccountSchema>;

