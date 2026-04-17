export const runtime = "nodejs";
import { createId } from "@paralleldrive/cuid2";
import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";

import { getSession } from "@/lib/get-session";
import z from "zod";
import { insertTransactionSchema } from "@/lib/validation/transaction";
import { subDays, parse } from "date-fns";

const app = new Hono()
  .get(
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

     const data = await prisma.transactions.findMany({
  select: {
    id: true,
    date: true,
    category: {
      select: {
        name: true,
      },
    },
    categoryId: true,
    payee: true,
    amount: true,
    notes: true,
    accounts: {
      select: {
        name: true,
      },
    },
    accountId: true,
  },
  where: {
    accounts: {
      userId: user.id,
    },

    ...(from || to
      ? {
          date: {
            ...(from && { gte: parse(from, "yyyy-MM-dd", new Date()) }),
            ...(to && { lte: parse(to, "yyyy-MM-dd", new Date()) }),
          },
        }
      : {}),
   
    ...(accountId && { accountId }),
  },
  orderBy: {
    date: "desc",
  },
});


      return c.json({ data });
    }
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const user = await getSession();
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await prisma.transactions.findFirst({
        select: {
          id: true,
          date: true,
          categoryId: true,
          payee: true,
          amount: true,
          notes: true,
          accountId: true,
        },
        where: {
          AND: [
            { id: id },
            {
              accounts: {
                userId: user.id,
              },
            },
          ],
        },
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data });
    }
  )
  .post(
    "/",
    zValidator("json", insertTransactionSchema.omit({ id: true })),
    async (c) => {
      const user = await getSession();
      const values = c.req.valid("json");
      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await prisma.transactions.create({
        data: {
          id: createId(),
          ...values,
          
        },
      });

      return c.json({ data });
    }
  )
  .post(
    "/bulk-create",
    zValidator(
      "json",
      z.array(
        insertTransactionSchema.omit({
          id: true,
        })
      )
    ),
    async (c) => {
      const user = await getSession();
      const values = c.req.valid("json");
      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await prisma.transactions.createMany({
        data: values.map((value) => ({
          id: createId(),
          ...value,
          amount: parseFloat(value.amount),
        })),
      });

      return c.json({ data });
    }
  )
  .post(
    "/bulk-delete",
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const user = await getSession();
      const values = c.req.valid("json");

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      // First, get the transactions to delete (for security check)
      const transactionsToDelete = await prisma.transactions.findMany({
        select: { id: true },
        where: {
          AND: [
            {
              id: {
                in: values.ids,
              },
            },
            {
              accounts: {
                userId: user.id,
              },
            },
          ],
        },
      });

      // Delete the transactions
      const data = await prisma.transactions.deleteMany({
        where: {
          id: {
            in: transactionsToDelete.map((t) => t.id),
          },
        },
      });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator("json", insertTransactionSchema.omit({ id: true })),
    async (c) => {
      const user = await getSession();
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const transactionsToUpdate = await prisma.transactions.findMany({
        select: { id: true },
        where: {
          AND: [
            { id: id },
            {
              accounts: {
                userId: user.id,
              },
            },
          ],
        },
      });

      if (!transactionsToUpdate.length) {
        return c.json({ error: "Not Found" }, 404);
      }
      const data = await prisma.transactions.update({
        where: { id: id },
        data: {
          ...values,
          amount: parseFloat(values.amount),
        },
      });
      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }
      return c.json({ data });
    }
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const user = await getSession();
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const transactionsToDelete = await prisma.transactions.findMany({
        select: { id: true },
        where: {
          AND: [
            { id: id },
            {
              accounts: {
                userId: user.id,
              },
            },
          ],
        },
      });

      if (!transactionsToDelete.length) {
        return c.json({ error: "Not Found" }, 404);
      }
      const data = await prisma.transactions.delete({
        where: { id: id },
      });
      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }
      return c.json({ data });
    }
  );

export default app;
