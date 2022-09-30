import type { NextPage } from "next";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "react-query/devtools";

import { Home } from "../components/Home";

const index: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ducky Commands</title>
        <meta
          name="description"
          content="Create your custom command for ducky"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </>
  );
};

export default index;
