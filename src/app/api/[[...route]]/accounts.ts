export const runtime = "nodejs";
import { createId } from "@paralleldrive/cuid2";
import { Hono } from "hono";
import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";

import { insertAccountSchema } from "@/lib/validation/account";
import { getSession } from "@/lib/get-session";
import z from "zod";

const app = new Hono()
  .get("/", async (c) => {
    const user = await getSession();
    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await prisma.accounts.findMany({
      select: {
        id: true,
        name: true,
      },
      where: { userId: user.id },
    });

    return c.json({ data });
  })
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

      const data = await prisma.accounts.findUnique({
        select: {
          id: true,
          name: true,
        },
        where: { id: c.req.param("id") },
      });
      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }
      return c.json({ data });
    }
  )
  .post(
    "/",
    zValidator("json", insertAccountSchema.pick({ name: true })),
    async (c) => {
      const user = await getSession();
      const values = c.req.valid("json");
      if (!user?.id) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await prisma.accounts.create({
        data: {
          id: createId(),
          userId: user.id,
          plaidId: "",
          ...values,
        },
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

      const data = await prisma.accounts.deleteMany({
        where: {
          id: {
            in: values.ids,
          },
          userId: user.id,
        },
      });

      return c.json({ data });
    }
  )
  .patch(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    zValidator("json", insertAccountSchema.pick({ name: true })),
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

      const data = await prisma.accounts.update({
        where: { id: c.req.param("id") },
        data: values,
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

      const data = await prisma.accounts.delete({
        where: { id: c.req.param("id") },
      });
      if (!data) {
        return c.json({ error: "Not Found" }, 404);
      }
      return c.json({ data });
    }
  );

export default app;
