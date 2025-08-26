import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
    getMany: protectedProcedure.query(async () => {
        const data = await db
        .select()
        .from(agents)
        // timeout for 5 seconds
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // throw new TRPCError({ code: "BAD_REQUEST" }) // to test error state
        return data;
    }),
        getOne: protectedProcedure.input(z.object({id: z.string()})).query(async ({input}) => {
        const [data] = await db
        .select()

        // TODO
        // .select({
            // meetingCount: sql<number>`5`,
            // ...getTableColumns(agents),
        // })
        .from(agents)
        .where(eq(agents.id, input.id))
        // timeout for 5 seconds
        // await new Promise(resolve => setTimeout(resolve, 5000));
        // throw new TRPCError({ code: "BAD_REQUEST" }) // to test error state
        return data;
    }),
    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async ({ input, ctx})=> {
        const [createdAgent] = await db
        .insert(agents)
        .values({
            ...input,
            userId: ctx.auth.user.id,
        })
        .returning()
        return createdAgent
    })
    })