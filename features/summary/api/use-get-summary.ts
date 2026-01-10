import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { useSearchParams } from "next/navigation";
import { convertAmountFromMiliUnits } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();

  // Memoize the extracted params so they don't change reference each render
  const { from, to, accountId } = useMemo(() => {
    return {
      from: params.get("from") || "",
      to: params.get("to") || "",
      accountId: params.get("accountId") || "",
    };
  }, [params]);

  return useQuery({
    queryKey: ["summary", { from, to, accountId }], // now stable between renders
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: { from, to, accountId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary");
      }

      const { data } = await response.json();

      return {
        ...data,
        incomeAmount: convertAmountFromMiliUnits(data.incomeAmount),
        expensesAmount: convertAmountFromMiliUnits(data.expensesAmount),
        remainingAmount: convertAmountFromMiliUnits(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          amount: convertAmountFromMiliUnits(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmountFromMiliUnits(day.income),
          expense: convertAmountFromMiliUnits(day.expenses),
        })),
      };
    },
  });
};
