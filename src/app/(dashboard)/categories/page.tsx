"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { useNewCategory } from "../../../../features/categories/hooks/use-new-category";
import { useGetCategories } from "../../../../features/categories/api/use-get-categories";

import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { useBulkDeleteCategories } from "../../../../features/categories/api/use-bulk-delete-categories";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoriesPage() {
  const newCategory = useNewCategory();
  const deleteCategory = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();
  const categories = categoriesQuery.data || [];

  const isDisabled = categoriesQuery.isLoading || deleteCategory.isPending;

  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 px-4 py-8 lg:px-14">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-[500px] w-full">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 px-4 py-8 lg:px-14">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
          <CardTitle className="text-xl line-clamp-1 ">Categories Page</CardTitle>
          <Button onClick={newCategory.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add New
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={categories}
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              deleteCategory.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
