import { Prisma } from '@ducky/db';
import { TRPCError } from '@trpc/server';
import { log } from 'next-axiom';
import { z } from 'zod';

import { protectedProcedure, router } from '../trpc';

export const commandsRouter = router({
    getAll: protectedProcedure.query(({ ctx }) => ctx.prisma.command.findMany()),

    add: protectedProcedure
        .input(
            z.object({
                matches: z.string().min(1).max(20),
                type: z.enum(['STICKER', 'TEXT', 'VIDEO', 'FOTO', 'AUDIO']),
                response: z.string().min(1).max(50),
                extraResponse: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                log.info('CommandsRouter create', {
                    matches: input.matches,
                    type: input.type,
                    response: input.response,
                    extraResponse: input.extraResponse,
                });
                return await ctx.prisma.command.create({
                    data: {
                        matches: input.matches,
                        response: input.response,
                        type: input.type,
                        extraResponse: input.extraResponse,
                    },
                });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    log.error('CommandsRouter error', {
                        code: 'BAD_REQUEST',
                        message: error.message,
                        error: error,
                    });
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
                log.info('CommandsRouter delete', { id: input.id });
                return await ctx.prisma.command.delete({
                    where: { id: input.id },
                });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    log.error('CommandsRouter error', {
                        code: 'BAD_REQUEST',
                        message: error.message,
                        error: error,
                    });
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: error.message,
                    });
                }
                throw error;
            }
        }),
});
