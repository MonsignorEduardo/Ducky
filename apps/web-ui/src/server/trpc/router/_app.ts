// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { commandsRouter } from './commands';
import { exampleRouter } from './example';

export const appRouter = router({
    example: exampleRouter,
    auth: authRouter,
    commands: commandsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
