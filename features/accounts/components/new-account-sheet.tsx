"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { AccountForm } from "./account-form";
import { useNewAccount } from "../hooks/use-new-account";
import { insertAccountSchema } from "@/lib/validation/account";
import { useCreateAccount } from "../api/use-create-accounts";
import { z } from "zod";

export default function NewAccountSheet() {
  const formSchema = insertAccountSchema.pick({
    name: true,
  });

  type FormValues = z.input<typeof formSchema>;

  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();
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
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your accounts
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
          onDelete={onClose}
      
        />
      </SheetContent>
    </Sheet>
  );
}
