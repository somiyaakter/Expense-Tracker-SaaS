import { z } from "zod";
export const insertTransactionSchema = z.object({
  id: z.string(),
  amount: z.int(),
  payee: z.string().min(1, "Transaction payee is required"),
  notes: z.string().optional(),
  date: z.coerce.date(),
  accountId: z.string().min(1, "Transaction accountId is required"),
  categoryId: z.string().optional(),
});

export const updateTransactionSchema = insertTransactionSchema.partial();

//Types
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type UpdateTransaction = z.infer<typeof updateTransactionSchema>;
