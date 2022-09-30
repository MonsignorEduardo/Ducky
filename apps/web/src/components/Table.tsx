import { Command } from '@prisma/client';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { trpc } from '../utils/trpc';

export interface TableProps {
  commands: Command[] | undefined;
  updateCommands: () => void;
}

function MyTable({ commands, updateCommands }: TableProps) {
  const deleteCommand = trpc.useMutation(['commands.delete']);

  useEffect(() => {
    if (deleteCommand.error) {
      console.log('ojo');
      toast.error("This didn't work.");
    }
    if (deleteCommand.data) {
      updateCommands();
      toast.success('Command Deleted');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCommand.data, deleteCommand.error]);

  const getLine = (command: Command) => (
    <tr
      key={command.id}
      className=" flex lg:table-row flex-row lg:flex-row flex-wrap border border-b lg:flex-no-wrap mb-10 lg:mb-0 "
    >
      <td className="w-full lg:w-auto p-3 text-gray-800 text-center lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-3 left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Matches
        </span>
        <div className="text-blue-200 text-right">{command.matches}</div>
      </td>

      <td className="w-full lg:w-auto p-3 text-gray-800 text-center lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-3 left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Response
        </span>
        <div className="text-blue-200 text-right">{command.response}</div>
      </td>

      <td className="w-full lg:w-auto p-3 text-gray-800 text-center lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top-3 left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Last Call
        </span>
        <div className="text-blue-200 text-right">{command.lastCall.toLocaleString()}</div>
      </td>

      <td className="w-full lg:w-auto p-3 text-gray-800 text-center lg:table-cell relative lg:static">
        <span className="lg:hidden absolute top- left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
          Actions
        </span>
        <button className="btn btn-square" onClick={() => deleteCommand.mutate({ id: command.id })}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
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
    <table className="table border-collapse w-fit">
      <thead>
        <tr>
          <th className="p-3 hidden lg:table-cell">Matches</th>
          <th className="p-3 hidden lg:table-cell">Response</th>
          <th className="p-3 hidden lg:table-cell">Last Call</th>
          <th className="p-3 hidden lg:table-cell">Actions</th>
        </tr>
      </thead>
      <tbody>{commands && commands.map((command) => getLine(command))}</tbody>
    </table>
  );
}

export default MyTable;
