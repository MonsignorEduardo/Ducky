import { Prisma } from '@ducky/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure, router } from '../trpc';

export const commandsRouter = router({
    getAll: protectedProcedure.query(({ ctx }) => ctx.prisma.command.findMany()),

    add: protectedProcedure
        .input(
            z.object({
                matches: z.string().min(1).max(20),
                response: z.string().min(1).max(20),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                return await ctx.prisma.command.create({
                    data: {
                        matches: input.matches,
                        response: input.response,
                    },
                });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: error.message,
                        // optional: pass the original error to retain stack trace
                    });
                }
                throw error;
            }
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input, ctx }) => {
            try {
                return await ctx.prisma.command.delete({
                    where: { id: input.id },
                });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: error.message,
                    });
                }
                throw error;
            }
        }),
});
