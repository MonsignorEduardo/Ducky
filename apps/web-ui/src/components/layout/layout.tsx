import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { trpc } from '../../utils/trpc';

export default function Layout({ children }: { children: JSX.Element }) {
    const auth = trpc.auth.getSession.useQuery();
    const session = auth.data;

    return (
        <>
            <Head>
                <title>Ducky</title>
                <meta name="description" content="Work With Ducky" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <Link href="/" className="btn-ghost btn text-xl normal-case text-blue-500">
                        Ducky
                    </Link>
                </div>

                {session ? (
                    <div className="flex-none gap-2">
                        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
                            <div className="w-10 rounded-full">
                                <Image
                                    src={session?.user?.image ?? '/favicon.ico'}
                                    alt=""
                                    width={'200'}
                                    height={'200'}
                                    className="rounded-lg"
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
