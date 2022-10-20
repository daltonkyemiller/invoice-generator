import type { NextPage } from 'next';
import Head from 'next/head';
import InvoiceBuilder from '../components/invoice/InvoiceBuilder';
import InvoiceRenderer from '../components/invoice/InvoiceRenderer';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>DKM Invoice Genertator</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex min-h-screen gap-3 p-4">
                <div className="h-full basis-1/3">
                    <InvoiceBuilder />
                </div>
                <div className="min-h-full basis-2/3 border-4">
                    <InvoiceRenderer />
                </div>
            </main>
        </>
    );
};

export default Home;
