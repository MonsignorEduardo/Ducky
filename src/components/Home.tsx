import { signIn, signOut } from 'next-auth/react';

import { trpc } from '../utils/trpc';
import AddCommandModal from './AddCommandModal';
import SpinnerOrLoad from './SpinnerOrLoad';
import MyTable from './Table';

const AuthHome = () => {
  const commands = trpc.useQuery(['commands.getAll']);

  return (
    <div className="flex flex-col items-center justify-around min-h-screen">
      <h1 className="font-extrabold text-center text-7xl">
        <span className="text-blue-500">Ducky</span> Commands
      </h1>

      <SpinnerOrLoad isLoading={commands.data === undefined}>
        {commands.data ? (
          <MyTable commands={commands.data} updateCommands={commands.refetch} />
        ) : (
          <></>
        )}
      </SpinnerOrLoad>

      <label htmlFor="inputCommandModal" className="btn modal-button">
        Add Command
      </label>

      <AddCommandModal updateCommands={commands.refetch} />
    </div>
  );
};

const Home = () => {
  const auth = trpc.useQuery(['auth.getSession']);
  const session = auth.data;

  return (
    <>
      {session ? (
        <AuthHome />
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
            }
          >
            {session ? 'Sign Out' : 'Sign In'}
          </button>
        </div>
      )}
    </>
  );
};

export { Home };
