import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { protectedProcedure, publicProcedure, router } from '../trpc';

export const authRouter = router({
    getSession: publicProcedure.query(({ ctx }) => {
        return ctx.session;
    }),
});
