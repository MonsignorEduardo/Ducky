import { trpc } from '../utils/trpc';
import AddCommandModal from './AddCommandModal';
import SpinnerOrLoad from './SpinnerOrLoad';
import MyTable from './Table';

const AuthHome = () => {
    const commands = trpc.commands.getAll.useQuery();

    return (
        <div className="flex min-h-screen flex-col items-center justify-around">
            <h1 className="text-center text-7xl font-extrabold">
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
