import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { NextPage } from 'next';
import { Toaster } from 'react-hot-toast';

import Home from '../components/Home';

const index: NextPage = () => {
    return (
        <>
            <Home />
            <ReactQueryDevtools initialIsOpen={false} />
            <Toaster />
        </>
    );
};

export default index;
