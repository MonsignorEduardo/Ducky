// src/pages/_app.tsx
import '../styles/globals.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppType } from 'next/app';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { trpc } from '../utils/trpc';

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />
        </SessionProvider>
    );
};

export { reportWebVitals } from 'next-axiom';
export default trpc.withTRPC(MyApp);
