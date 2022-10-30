import { Prisma } from '@ducky/db';
import { TRPCError } from '@trpc/server';
import { log } from 'next-axiom';
import { z } from 'zod';

import { protectedProcedure, router } from '../trpc';

export const birthdaysRouter = router({
    getAll: protectedProcedure.query(({ ctx }) => ctx.prisma.birthday.findMany()),

    add: protectedProcedure
        .input(
            z.object({
                name: z.string().min(1).max(30),
                day: z.date(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            try {
                log.info('BirthdaysRouter create', {
                    name: input.name,
                    day: input.day,
                });

                const telegramUser = await ctx.prisma.telegramUser.findFirst({
                    where: { username: input.name },
                });
                if (telegramUser) {
                    return await ctx.prisma.birthday.create({
                        data: {
                            username: input.name,
                            day: input.day,
                        },
                    });
                }
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    log.error('BirthdaysRouter error', {
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
                log.info('BirthdaysRouter delete', { id: input.id });
                return await ctx.prisma.birthday.delete({
                    where: { id: input.id },
                });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    log.error('BirthdaysRouter error', {
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
