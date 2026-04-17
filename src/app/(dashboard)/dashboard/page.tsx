import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import { Skeleton } from "@/components/ui/skeleton";
import React, { Suspense } from "react";

const DashboardPageFallback = () => (
  <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 px-4 lg:px-14">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
      <Skeleton className="h-[164px] rounded-xl" />
      <Skeleton className="h-[164px] rounded-xl" />
      <Skeleton className="h-[164px] rounded-xl" />
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
      <Skeleton className="lg:col-span-4 h-[420px] rounded-xl" />
      <Skeleton className="lg:col-span-2 h-[420px] rounded-xl" />
    </div>
  </div>
);

const DashboardContent = () => {
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24 px-4 lg:px-14">
      <DataGrid />
      <DataCharts />
    </div>
  );
};

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardPageFallback />}>
      <DashboardContent />
    </Suspense>
  );
}
