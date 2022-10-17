import type { NextPage } from "next";
import Head from "next/head";
import InvoiceBuilder from "../components/invoice/InvoiceBuilder";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>DKM Invoice Genertator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <InvoiceBuilder />
        <h1>Hello</h1>
      </main>
    </>
  );
};

export default Home;
