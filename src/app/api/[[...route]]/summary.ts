import { getSession } from "@/lib/get-session";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import z from "zod";
import { subDays, parse, isValid, differenceInDays } from "date-fns";
import { calculatePercentageChange, fillMissingDays } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

const app = new Hono().get(
  "/",
  zValidator(
    "query",
    z.object({
      from: z.string().optional(),
      to: z.string().optional(),
      accountId: z.string().optional(),
    })
  ),
  async (c) => {
    const user = await getSession();
    const { from, to, accountId } = c.req.valid("query");

    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const defaultTo = new Date();
    const defaultFrom = subDays(defaultTo, 30);

    const startDate = from
      ? parse(from, "yyyy-MM-dd", new Date())
      : defaultFrom;
    const endDate = to ? parse(to, "yyyy-MM-dd", new Date()) : defaultTo;

    if (!isValid(startDate) || !isValid(endDate)) {
      return c.json({ error: "Invalid date format" }, 400);
    }

    const periodLength = differenceInDays(endDate, startDate) + 1;
    const lastPeriodStart = subDays(startDate, periodLength);
    const lastPeriodEnd = subDays(endDate, periodLength);

    async function fetchFinancialData(
      userId: string,
      start: Date,
      end: Date,
      accId?: string
    ) {
      const userAccounts = await prisma.accounts.findMany({
        where: { userId },
        select: { id: true },
      });
      const accountIds = userAccounts.map((acc) => acc.id);

      const whereConditions = {
        accountId: accId ? accId : { in: accountIds },
        date: {
          gte: start,
          lte: end,
        },
      };

      const result = await prisma.transactions.findMany({
        where: whereConditions,
        select: { amount: true },
      });

      const income = result
        .filter((t) => t.amount >= 0)
        .reduce((sum, t) => sum + t.amount, 0);

      const expenses = Math.abs(
        result.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0)
      );

      const remaining = result.reduce((sum, t) => sum + t.amount, 0);

      return { income, expenses, remaining };
    }

    const currentPeriod = await fetchFinancialData(
      user.id,
      startDate,
      endDate,
      accountId
    );
    const lastPeriod = await fetchFinancialData(
      user.id,
      lastPeriodStart,
      lastPeriodEnd,
      accountId
    );

    const incomeChange = calculatePercentageChange(
      currentPeriod.income,
      lastPeriod.income
    );
    const expensesChange = calculatePercentageChange(
      currentPeriod.expenses,
      lastPeriod.expenses
    );
    const remainingChange = calculatePercentageChange(
      currentPeriod.remaining,
      lastPeriod.remaining
    );

    // Get user accounts
    const userAccounts = await prisma.accounts.findMany({
      where: { userId: user.id },
      select: { id: true },
    });
    const accountIds = userAccounts.map((acc) => acc.id);

    // Category breakdown
    const categoryData = await prisma.transactions.groupBy({
      by: ["categoryId"],
      where: {
        accountId: accountId ? accountId : { in: accountIds },
        amount: { lt: 0 },
        date: { gte: startDate, lte: endDate },
        categoryId: { not: null },
      },
      _sum: { amount: true },
      orderBy: { _sum: { amount: "asc" } },
    });

    const categoriesWithNames = await Promise.all(
      categoryData.map(async (item) => {
        if (!item.categoryId) {
          return {
            name: "Uncategorized",
            value: Math.abs(item._sum.amount || 0),
          };
        }
        const category = await prisma.categories.findUnique({
          where: { id: item.categoryId },
          select: { name: true },
        });
        return {
          name: category?.name || "Unknown",
          value: Math.abs(item._sum.amount || 0),
        };
      })
    );

    const topCategories = categoriesWithNames.slice(0, 3);
    const otherCategories = categoriesWithNames.slice(3);
    const otherSum = otherCategories.reduce((sum, cat) => sum + cat.value, 0);

    const finalCategories = topCategories;
    if (otherCategories.length > 0) {
      finalCategories.push({ name: "Other", value: otherSum });
    }

    // Daily transactions query
    const dailyTransactions = await prisma.transactions.findMany({
      where: {
        accountId: accountId ? accountId : { in: accountIds },
        date: { gte: startDate, lte: endDate },
      },
      select: {
        date: true,
        amount: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    // Group by date, sum income and expenses per day
    const dailyData = new Map<
      string,
      { date: string; income: number; expenses: number }
    >();

    dailyTransactions.forEach((transaction) => {
      const dateKey = transaction.date.toISOString().split("T")[0];

      if (!dailyData.has(dateKey)) {
        dailyData.set(dateKey, {
          date: dateKey,
          income: 0,
          expenses: 0,
        });
      }

      const day = dailyData.get(dateKey)!;

      if (transaction.amount >= 0) {
        day.income += transaction.amount;
      } else {
        day.expenses += Math.abs(transaction.amount);
      }
    });

    // Sort daily data by date
    const activeDaysFormatted = Array.from(dailyData.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Fill missing days (if fillMissingDays is your utility, otherwise use the function below)
    function fillMissingDays(days: any, start: any, end: any) {
      const result = [];
      let current = new Date(start);
      while (current <= end) {
        const dateStr = current.toISOString().split("T")[0];
        const found = days.find((d: any) => d.date === dateStr);
        if (found) {
          result.push(found);
        } else {
          result.push({ date: dateStr, income: 0, expenses: 0 });
        }
        current.setDate(current.getDate() + 1);
      }
      return result;
    }

    const activeDays = fillMissingDays(activeDaysFormatted, startDate, endDate);

    return c.json({
      data: {
        remainingAmount: currentPeriod.remaining,
        remainingChange,
        incomeAmount: currentPeriod.income,
        incomeChange,
        expensesAmount: currentPeriod.expenses,
        expensesChange,
        categories: finalCategories,
        days: activeDays,
      },
    });
  }
);

export default app;
