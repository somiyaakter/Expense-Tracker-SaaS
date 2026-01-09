import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Loader2, PieChart,Radar,Target } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PieVariant } from "@/components/pie-variant";
import { RadarVariant } from "@/components/radar-variant";
import { RadialVariant } from "@/components/radial-variant";
import { Skeleton } from "./ui/skeleton";
type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const SpendingPie = ({ data = [] }: Props) => {
  const [chartType, setChartType] = useState("pie");
  const onTypeChange = (type: string) => {
    // TODO: Add Paywall

    setChartType(type);
  };
const chartData = useMemo(() => data, [data]);
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between ">
        <CardTitle className="text-xl line-clamp-1">Categories</CardTitle>
        {/* TODO:Add Select */}
        <Select defaultValue={chartType} onValueChange={onTypeChange}>
          <SelectTrigger className="lg:w-auto h-9 rounded-md px-3">
            <SelectValue placeholder="Chart type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pie">
              <div className="flex items-center ">
                <PieChart className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Pie Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radar">
              <div className="flex items-center ">
                <Radar className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radar Chart</p>
              </div>
            </SelectItem>
            <SelectItem value="radial">
              <div className="flex items-center ">
                <Target className="size-4 mr-2 shrink-0" />
                <p className="line-clamp-1">Radial Chart</p>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <div className="flex flex-col gap-y-4 items-center justify-center h-[350px] w-full">
            <FileSearch className="size-6 text-muted-foreground" />
            <p className="text-muted-foreground">No data available</p>
          </div>
        ) : (
          <>
            {chartType === "pie" && <PieVariant data={chartData} />}
            {chartType === "radar" && <RadarVariant data={chartData} />}
            {chartType === "radial" && <RadialVariant data={chartData} />}
          </>
        )}
      </CardContent>
    </Card>
  );
};
export const SpendingPieLoading = () => {
    return (
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="flex space-y-2 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between ">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-8 lg:w-[120px] w-full" />
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-[350px] w-full">
                    <Loader2 className="h-6 w-6 animate-spin text-slate-300" />
                </div>
            </CardContent>
        </Card>
    );
}