"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CategoryForm } from "./category-form";
import { useNewCategory } from "../hooks/use-new-category";
import { insertCategorySchema } from "@/lib/validation/category";
import { useCreateCategory } from "../api/use-create-category";
import { z } from "zod";

export default function NewCategorySheet() {
  const formSchema = insertCategorySchema.pick({
    name: true,
  });

  type FormValues = z.input<typeof formSchema>;

  const { isOpen, onClose } = useNewCategory();

  const mutation = useCreateCategory();
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Category</SheetTitle>
          <SheetDescription>
            Create a new category to organize your transactions
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
          onDelete={onClose}
        />
      </SheetContent>
    </Sheet>
  );
}
