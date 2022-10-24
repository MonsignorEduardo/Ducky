import { Command } from '@ducky/prisma/prisma-client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { trpc } from '../utils/trpc';

export interface TableProps {
    commands: Command[] | undefined;
}

function MyTable({ commands }: TableProps) {
    const deleteCommand = trpc.commands.delete.useMutation();
    const { refetch: commandsRefetch } = trpc.commands.getAll.useQuery();
    useEffect(() => {
        if (deleteCommand.error) {
            console.log('ojo');
            toast.error("This didn't work.");
        }
        if (deleteCommand.data) {
            commandsRefetch()
                .then(() => toast.success('Command Deleted'))
                .catch(() => {
                    toast.error("This didn't work.");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteCommand.data, deleteCommand.error]);

    const getLine = (command: Command) => (
        <tr
            key={command.id}
            className=" lg:flex-no-wrap mb-10 flex flex-row flex-wrap border border-b lg:mb-0 lg:table-row lg:flex-row ">
            <td className="relative w-full p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                <span className="absolute top-3 left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                    Matches
                </span>
                <div className="text-right text-blue-200">{command.matches}</div>
            </td>

            <td className="relative w-full p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                <span className="absolute top-3 left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                    Response
                </span>
                <div className="text-right text-blue-200">{command.response}</div>
            </td>

            <td className="relative w-full p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                <span className="absolute top-3 left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                    Last Call
                </span>
                <div className="text-right text-blue-200">{command.lastCall.toLocaleString()}</div>
            </td>

            <td className="relative w-full p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                <span className="top- absolute left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                    Actions
                </span>
                <button
                    className="btn-square btn"
                    onClick={() => deleteCommand.mutate({ id: command.id })}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </td>
        </tr>
    );
    return (
        <table className="table w-fit border-collapse">
            <thead>
                <tr>
                    <th className="hidden p-3 lg:table-cell">Matches</th>
                    <th className="hidden p-3 lg:table-cell">Response</th>
                    <th className="hidden p-3 lg:table-cell">Last Call</th>
                    <th className="hidden p-3 lg:table-cell">Actions</th>
                </tr>
            </thead>
            <tbody>{commands && commands.map((command) => getLine(command))}</tbody>
        </table>
    );
}

export default MyTable;
