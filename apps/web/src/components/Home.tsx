import { signIn, signOut } from 'next-auth/react';

import { trpc } from '../utils/trpc';
import HomeAuth from './HomeAuth';

const Home = () => {
    const auth = trpc.useQuery(['auth.getSession']);
    const session = auth.data;

    return (
        <>
            {session ? (
                <HomeAuth />
            ) : (
                <div className="flex items-center justify-around min-h-full mt-96">
                    <button
                        className="btn"
                        onClick={
                            session
                                ? () => {
                                      signOut();
                                  }
                                : () => {
                                      signIn();
                                  }
                        }>
                        {session ? 'Sign Out' : 'Sign In'}
                    </button>
                </div>
            )}
        </>
    );
};

export { Home };
