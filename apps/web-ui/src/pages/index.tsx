import type { NextPage } from 'next';
import { Toaster } from 'react-hot-toast';

import Home from '../components/Home';

const index: NextPage = () => {
    return (
        <>
            <Home />
            <Toaster />
        </>
    );
};

export default index;
