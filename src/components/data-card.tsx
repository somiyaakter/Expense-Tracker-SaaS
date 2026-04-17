import React from "react";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";
import { IconType } from "react-icons/lib";
import { ArrowDown, ArrowUp } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CountUp from "@/components/count-up";

const boxVariant = cva(
  "shrink-0 rounded-xl p-3 ring-1 transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary/10 ring-primary/20",
        success: "bg-emerald-500/10 ring-emerald-500/20",
        danger: "bg-rose-500/10 ring-rose-500/20",
        warning: "bg-amber-500/10 ring-amber-500/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

const iconVariant = cva("size-5", {
  variants: {
    variant: {
      default: "fill-primary",
      success: "fill-emerald-600",
      danger: "fill-rose-600",
      warning: "fill-amber-600",
    },
  },
  defaultVariants: { variant: "default" },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof iconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
  icon: IconType;
  title: string;
  value?: number;
  dateRange: string;
  percentageChange?: number;
}

export const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  dateRange,
  variant,
  percentageChange = 0,
}: DataCardProps) => {
  const trendUp = percentageChange > 0;
  const trendDown = percentageChange < 0;

  return (
    <Card className="group relative overflow-hidden border-border/60 bg-card shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-48 rounded-full bg-primary/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"
      />
      <CardHeader className="flex flex-row items-start justify-between gap-x-4 pb-2">
        <div className="space-y-1.5 min-w-0">
          <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider line-clamp-1">
            {title}
          </CardTitle>
          <CardDescription className="text-xs line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={cn(iconVariant({ variant }))} />
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <h1 className="text-3xl font-semibold tracking-tight tabular-nums mb-3 line-clamp-1">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimals={2}
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <div className="flex items-center gap-2 text-xs">
          <span
            className={cn(
              "inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full font-medium",
              trendUp && "bg-emerald-500/10 text-emerald-600",
              trendDown && "bg-rose-500/10 text-rose-600",
              !trendUp && !trendDown && "bg-muted text-muted-foreground"
            )}
          >
            {trendUp && <ArrowUp className="size-3" />}
            {trendDown && <ArrowDown className="size-3" />}
            {formatPercentage(percentageChange, { addPrefix: false })}
          </span>
          <span className="text-muted-foreground line-clamp-1">
            from last period
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export const DataCardLoading = () => {
  return (
    <Card className="border-border/60 bg-card shadow-sm h-[164px]">
      <CardHeader className="flex flex-row items-start justify-between gap-x-4 pb-2">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="size-11 rounded-xl" />
      </CardHeader>
      <CardContent className="pt-2">
        <Skeleton className="h-8 w-32 mb-3" />
        <Skeleton className="h-4 w-40" />
      </CardContent>
    </Card>
  );
};
