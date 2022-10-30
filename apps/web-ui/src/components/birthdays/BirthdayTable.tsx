import { Birthday } from '@ducky/db';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

import { trpc } from '../../utils/trpc';
import SpinnerOrLoad from '../SpinnerOrLoad';

function BirthdayTable() {
    const birthdays = trpc.birthday.getAll.useQuery();
    const deleteBirthday = trpc.birthday.delete.useMutation();
    const { refetch: birthdaysRefetch } = trpc.birthday.getAll.useQuery();
    useEffect(() => {
        if (deleteBirthday.error) {
            toast.error("This didn't work.");
        }
        if (deleteBirthday.data) {
            birthdaysRefetch()
                .then(() => toast.success('Birthdays Deleted'))
                .catch(() => {
                    toast.error("This didn't work.");
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deleteBirthday.data, deleteBirthday.error]);

    const getLine = (birthDay: Birthday) => (
        <tr
            key={birthDay.id}
            className=" lg:flex-no-wrap mb-10 flex flex-row flex-wrap border border-b lg:mb-0 lg:table-row lg:flex-row ">
            <td className="relative w-full p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                <span className="absolute top-3 left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                    Name
                </span>
                <div className="text-right text-blue-200">{birthDay.username}</div>
            </td>

            <td className="relative w-full p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                <span className="absolute top-3 left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                    Date
                </span>
                <div className="text-right text-blue-200">{birthDay.day.toDateString()}</div>
            </td>

            <td className="relative w-full p-3 text-center text-gray-800 lg:static lg:table-cell lg:w-auto">
                <span className="top- absolute left-2 bg-blue-200 px-2 py-1 text-xs font-bold uppercase lg:hidden">
                    Actions
                </span>
                <button
                    className="btn-square btn"
                    onClick={() => deleteBirthday.mutate({ id: birthDay.id })}>
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
        <SpinnerOrLoad isLoading={birthdays.data === undefined}>
            <table className="table w-fit border-collapse">
                <thead>
                    <tr>
                        <th className="hidden p-3 lg:table-cell">Name</th>
                        <th className="hidden p-3 lg:table-cell">Date</th>
                        <th className="hidden p-3 lg:table-cell">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {birthdays.data && birthdays.data.map((birthday) => getLine(birthday))}
                </tbody>
            </table>
        </SpinnerOrLoad>
    );
}

export default BirthdayTable;
