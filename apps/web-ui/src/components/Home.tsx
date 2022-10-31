import Image from 'next/image';
import Link from 'next/link';
import { signIn, signOut } from 'next-auth/react';

import { trpc } from '../utils/trpc';

const Home = () => {
    const auth = trpc.auth.getSession.useQuery();
    const session = auth.data;
    return (
        <div className="flex min-h-screen flex-col items-center justify-around">
            <div className="grid grid-cols-2 gap-4">
                <button
                    className="btn col-span-2"
                    onClick={
                        session
                            ? () => {
                                  void signOut();
                              }
                            : () => {
                                  void signIn();
                              }
                    }>
                    {session ? 'Sign Out' : 'Sign In'}
                </button>
                <div className="col-span-2 md:col-span-1">
                    <Link href="/commands" prefetch={false}>
                        <Image
                            src={'/descargar.jpeg'}
                            alt="Picture of the Commands"
                            width={300}
                            height={300}
                            className="rounded-lg"></Image>
                    </Link>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <Link href="/birthdays" prefetch={false}>
                        <Image
                            src={'/cumple.jpeg'}
                            alt="Picture of the birthdays"
                            width={300}
                            height={300}
                            className="rounded-lg"></Image>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
