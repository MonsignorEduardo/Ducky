/* eslint-disable @typescript-eslint/no-misused-promises */
import { Command } from '@ducky/db';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { trpc } from '../../utils/trpc';

type Inputs = {
    matches: Command['matches'];
    response: Command['response'];
    // extraResponse: Command['extraResponse'];
    type: Command['type'];
};

export function AddCommandModal() {
    const addCommand = trpc.commands.add.useMutation();
    const { refetch: commandsRefetch } = trpc.commands.getAll.useQuery();

    const onSubmit: SubmitHandler<Inputs> = (command) => {
        addCommand.mutate({
            matches: command.matches,
            response: command.response,
            type: command.type,
            // extraResponse: command.extraResponse,
        });
    };
    useEffect(() => {
        if (addCommand.error) {
            toast.error("This didn't work.");
        }
        if (addCommand.data) {
            commandsRefetch()
                .then(() => toast.success('Command Added'))
                .catch(() => {
                    toast.error("This didn't work.");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addCommand.data, addCommand.error]);

    //Forms
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    return (
        <>
            <input type="checkbox" id="inputCommandModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="inputCommandModal"
                        className="btn-sm btn-circle btn absolute right-2 top-2">
                        ✕
                    </label>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium">Matches</label>
                            <input
                                type="text"
                                id="large-input"
                                {...register('matches', { required: true })}
                                className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium ">Response</label>
                            <input
                                type="text"
                                {...register('response', { required: true })}
                                className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>
                        {/* <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium ">
                                Extra Response
                            </label>
                            <input
                                type="text"
                                {...register('extraResponse')}
                                className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        </div> */}
                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium ">Type</label>
                            <select
                                defaultValue={'TEXT'}
                                {...register('type', { required: true })}
                                className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
                                <option value="STICKER">STICKER</option>
                                <option value="TEXT">TEXT</option>
                                <option value="VIDEO">VIDEO</option>
                                <option value="FOTO">FOTO</option>
                                <option value="AUDIO">AUDIO</option>
                            </select>
                        </div>
                        <input
                            type="submit"
                            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto"
                        />
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddCommandModal;
