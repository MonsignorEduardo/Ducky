import AddCommandModal from '../../components/commands/AddCommandModal';
import MyTable from '../../components/commands/Table';
import Layout from '../../components/layout/layout';
import SpinnerOrLoad from '../../components/SpinnerOrLoad';
import { trpc } from '../../utils/trpc';

const Commands = () => {
    const commands = trpc.commands.getAll.useQuery();
    return (
        <Layout>
            <div className="flex min-h-screen flex-col items-center justify-around">
                <h1 className="text-center text-7xl font-extrabold">
                    <span className="text-white">Commands</span>
                </h1>

                <SpinnerOrLoad isLoading={commands.data === undefined}>
                    {commands.data ? <MyTable commands={commands.data} /> : <></>}
                </SpinnerOrLoad>

                <label htmlFor="inputCommandModal" className="modal-button btn">
                    Add Command
                </label>

                <AddCommandModal />
            </div>
        </Layout>
    );
};

export default Commands;
