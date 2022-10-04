// import NextAuth, { type NextAuthOptions } from "next-auth";
// import DiscordProvider from "next-auth/providers/discord";

// // Prisma adapter for NextAuth, optional and can be removed
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { prisma } from "../../../server/db/client";
import { env } from '../../../env/server.mjs';

// export const authOptions: NextAuthOptions = {
//   // Include user.id on session
//   callbacks: {
//     session({ session, user }) {
//       if (session.user) {
//         session.user.id = user.id;
//       }
//       return session;
//     },
//   },
//   // Configure one or more authentication providers
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     DiscordProvider({
//       clientId: env.DISCORD_CLIENT_ID,
//       clientSecret: env.DISCORD_CLIENT_SECRET,
//     }),
//     // ...add more providers here
//   ],
// };

// export default NextAuth(authOptions);

import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  debug: true, // Configure one or more authentication providers
  // adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        secret: {
          label: 'Secret',
          type: 'text',
          placeholder: 'Secret',
        },
      },
      async authorize(credentials) {
        const secret = credentials?.secret;
        if (secret === env.SECRET_KEY)
          return {
            id: 1,
            name: 'J Smith',
            email: 'jsmith@example.com',
            image: 'https://i.pravatar.cc/150?u=jsmith@example.com',
          };
        else return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
