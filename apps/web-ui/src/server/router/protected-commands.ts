import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createProtectedRouter } from './context';

// Example router with queries that can only be hit if the user requesting is signed in
export const protectedCommands = createProtectedRouter()
    .query('getAll', {
        async resolve({ ctx }) {
            const post = await ctx.prisma.command.findMany();
            return post;
        },
    })
    .mutation('add', {
        input: z.object({
            matches: z.string().min(1).max(20),
            response: z.string().min(1).max(20),
        }),
        async resolve({ input, ctx }) {
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
        },
    })
    .mutation('delete', {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ input, ctx }) {
            try {
                return await ctx.prisma.command.delete({ where: { id: input.id } });
            } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: error.message,
                    });
                }
                throw error;
            }
        },
    });
