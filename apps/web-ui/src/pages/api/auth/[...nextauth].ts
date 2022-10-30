// /* eslint-disable simple-import-sort/imports */
// Prisma adapter for NextAuth, optional and can be removed

import { prisma } from '@ducky/db';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

import { env } from '../../../env/server.mjs';

export const authOptions: NextAuthOptions = {
    session: { strategy: 'jwt' },

    // Configure one or more authentication providers
    adapter: PrismaAdapter(prisma),
    providers: [
        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),
        // ...add more providers here
    ],
};

export default NextAuth(authOptions);
