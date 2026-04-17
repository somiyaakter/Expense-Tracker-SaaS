"use client";
import React from "react";
import { z } from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Loader2 } from "lucide-react";
import { useNewTransaction } from "../hooks/use-new-transaction";
import { insertTransactionSchema } from "@/lib/validation/transaction";
import { useCreateTransaction } from "../api/use-create-transaction";
import { useCreateCategory } from "../../categories/api/use-create-category";
import { useGetCategories } from "../../categories/api/use-get-categories";
import { useGetAccounts } from "../../accounts/api/use-get-accounts";
import { useCreateAccount } from "../../accounts/api/use-create-accounts";
import { TransactionForm } from "./transaction-form";


export default function NewTransactionSheet() {
  const formSchema = insertTransactionSchema.omit({
    id: true,
  });

  type FormValues = z.input<typeof formSchema>;

  const { isOpen, onClose } = useNewTransaction();

  const createMutation = useCreateTransaction();


  const categoryQuery = useGetCategories();
  const categoryMutation = useCreateCategory();
  const onCreateCategory = (name: string) => {
    categoryMutation.mutate({ name });
  };
  const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));



  const accountQuery = useGetAccounts();
  const accountMutation = useCreateAccount();
  const onCreateAccount = (name: string) => {
    accountMutation.mutate({ name });
  };
  const accountOptions = (accountQuery.data ?? []).map((account) => ({
    label: account.name,
    value: account.id,
  }));



  const isPending =
    createMutation.isPending ||
    categoryMutation.isPending ||
    accountMutation.isPending;

  const isLoading = categoryQuery.isLoading || accountQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };


  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Transaction</SheetTitle>
          <SheetDescription>Add a new transaction</SheetDescription>
        </SheetHeader>
        {isLoading ? (
          <div className="flex items-center justify-center absolute inset-0">
            <Loader2 className="size-4 text-muted-foreground animate-spin" />
          </div>
        ) : (
          <TransactionForm
            onSubmit={onSubmit}
            disabled={isPending}
            categoryOptions={categoryOptions}
            onCreateCategory={onCreateCategory}
            accountOptions={accountOptions}
            onCreateAccount={onCreateAccount}
            onDelete={() => {}}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}
