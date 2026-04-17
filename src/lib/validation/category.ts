import { z } from "zod"

export const insertCategorySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Category name is required"),
    plaidId: z.string().min(1, "Category plaidId is required"),
    userId: z.string().min(1, "Category userId is required"),
})

export const updateCategorySchema = insertCategorySchema.partial();

//Types
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type UpdateCategory = z.infer<typeof updateCategorySchema>;
