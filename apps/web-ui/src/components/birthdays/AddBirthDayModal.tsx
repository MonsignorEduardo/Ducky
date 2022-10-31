import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { trpc } from '../../utils/trpc';

export function AddBirthDayModal() {
    const addBirthday = trpc.birthday.add.useMutation();
    const { refetch: birthdayRefetch } = trpc.birthday.getAll.useQuery();
    const [name, setName] = useState('');
    const [date, setDate] = useState('');

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addBirthday.mutate({
            name: name,
            day: new Date(date),
        });
    };
    useEffect(() => {
        if (addBirthday.error) {
            toast.error("This didn't work.");
            console.error(addBirthday.error);
        }
        if (addBirthday.data) {
            birthdayRefetch()
                .then(() => toast.success('Birthday Added'))
                .catch(() => {
                    toast.error("This didn't work.");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addBirthday.data, addBirthday.error]);

    return (
        <>
            <input type="checkbox" id="addBirthDayModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="addBirthDayModal"
                        className="btn-sm btn-circle btn absolute right-2 top-2">
                        ✕
                    </label>

                    <form onSubmit={onSubmit}>
                        <div className="mb-6">
                            <label htmlFor="large-input" className="mb-2 block text-sm font-medium">
                                Name
                            </label>
                            <input
                                type="text"
                                id="large-input"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={addBirthday.isLoading}
                            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-auto">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AddBirthDayModal;
