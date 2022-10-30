// src/server/trpc/router/_app.ts
import { router } from '../trpc';
import { authRouter } from './auth';
import { birthdaysRouter } from './birthdays';
import { commandsRouter } from './commands';

export const appRouter = router({
    auth: authRouter,
    commands: commandsRouter,
    birthday: birthdaysRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
