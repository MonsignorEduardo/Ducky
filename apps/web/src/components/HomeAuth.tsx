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

export default AuthHome;
