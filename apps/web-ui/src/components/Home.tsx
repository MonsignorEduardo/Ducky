import { signIn, signOut } from 'next-auth/react';
import { log } from 'next-axiom';

import { trpc } from '../utils/trpc';
import HomeAuth from './HomeAuth';

const Home = () => {
    const auth = trpc.auth.getSession.useQuery();
    const session = auth.data;
    log.debug('User session in', { session });
    return (
        <>
            {session ? (
                <HomeAuth />
            ) : (
                <div className="mt-96 flex min-h-full items-center justify-around">
                    <button
                        className="btn"
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
                </div>
            )}
        </>
    );
};

export { Home };
