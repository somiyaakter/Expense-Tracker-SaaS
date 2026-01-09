import { DataCharts } from "@/components/data-charts";
import { DataGrid } from "@/components/data-grid";
import React, { Suspense } from "react";

// Loading fallback component
const DashboardPageFallback = () => (
  <div className="max-w-screen-xl mx-auto w-full pb-10 -mt-24 px-4 py-8 lg:px-14">
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pb-2 mb-8">
      <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
      <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
      <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
    </div>
    <div className="animate-pulse bg-gray-200 h-64 rounded-lg"></div>
  </div>
);

// Main dashboard content
const DashboardContent = () => {
  return (
    <div className="max-w-screen-2xl p-8 mx-auto w-full pb-10 -mt-24">
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
