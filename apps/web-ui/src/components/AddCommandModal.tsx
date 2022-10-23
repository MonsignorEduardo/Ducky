import { Command } from '@prisma/client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { trpc } from '../utils/trpc';

/* eslint-disable-next-line */
export interface AddCommandModalProps {
    updateCommands: () => void;
}

export function AddCommandModal({ updateCommands }: AddCommandModalProps) {
    const addCommand = trpc.commands.add.useMutation();

    const [command, setCommand] = useState<Pick<Command, 'matches' | 'response'>>({
        matches: '',
        response: '',
    });
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addCommand.mutate({
            matches: command.matches,
            response: command.response,
        });
    };
    useEffect(() => {
        if (addCommand.error) {
            console.log('ojo');
            toast.error("This didn't work.");
        }
        if (addCommand.data) {
            updateCommands();
            toast.success('Command Created');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addCommand.data, addCommand.error]);

    return (
        <>
            <input type="checkbox" id="inputCommandModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="inputCommandModal"
                        className="btn btn-sm btn-circle absolute right-2 top-2">
                        ✕
                    </label>

                    <form onSubmit={onSubmit}>
                        <div className="mb-6">
                            <label htmlFor="large-input" className="mb-2 block text-sm font-medium">
                                Matches
                            </label>
                            <input
                                type="text"
                                id="large-input"
                                value={command.matches}
                                onChange={(e) =>
                                    setCommand({
                                        ...command,
                                        matches: e.target.value,
                                    })
                                }
                                className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label
                                htmlFor="large-input"
                                className="mb-2 block text-sm font-medium ">
                                Response
                            </label>
                            <input
                                type="text"
                                id="large-input"
                                value={command.response}
                                onChange={(e) =>
                                    setCommand({
                                        ...command,
                                        response: e.target.value,
                                    })
                                }
                                className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={addCommand.isLoading}
                            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddCommandModal;
