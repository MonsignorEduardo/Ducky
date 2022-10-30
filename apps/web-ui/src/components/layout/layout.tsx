import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { trpc } from '../../utils/trpc';

export default function Layout({ children }: { children: JSX.Element }) {
    const auth = trpc.auth.getSession.useQuery();
    const session = auth.data;
    console.log('🚀 ~ file: layout.tsx ~ line 10 ~ Layout ~ session', session);

    return (
        <>
            <Head>
                <title>Ducky Commands</title>
                <meta name="description" content="Create your custom command for ducky" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link href="/">
                        <a className="btn-ghost btn text-xl normal-case text-blue-500">Ducky</a>
                    </Link>
                </div>

                {session ? (
                    <div className="flex-none gap-2">
                        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                            <div className="w-10 rounded-full">
                                <Image
                                    src={session?.user?.image ?? '/favicon.ico'}
                                    alt=""
                                    layout="fill"
                                    onClick={() => void signOut()}
                                />
                            </div>
                        </label>
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <main>{children}</main>
        </>
    );
}
