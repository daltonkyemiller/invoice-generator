import type { NextPage } from 'next';
import Head from 'next/head';
import InvoiceBuilder from '../components/invoice/InvoiceBuilder';
import InvoiceRenderer from '../components/invoice/InvoiceRenderer';
import { motion } from 'framer-motion';

const Home: NextPage = () => {
    return (
        <>
            <Head>
                <title>DKM Invoice Genertator</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="flex min-h-screen flex-col items-center gap-3 p-4">
                <motion.h1 className="text-9xl font-bold">
                    {'INVOICE GENERATOR'.split('').map((l, k) => (
                        <motion.span
                            key={k}
                            animate={{
                                filter: [
                                    'brightness(100%)',
                                    'brightness(250%)',
                                ],
                            }}
                            transition={{
                                duration: 0.25,
                                repeat: Infinity,
                                repeatType: 'mirror',
                                delay: k * 0.1,
                            }}
                        >
                            {l}
                        </motion.span>
                    ))}
                </motion.h1>
                <div className="flex w-full gap-3">
                    <div className="h-full basis-1/3">
                        <InvoiceBuilder />
                    </div>
                    <div className="glow-border min-h-full basis-2/3">
                        <InvoiceRenderer />
                    </div>
                </div>
            </main>
        </>
    );
};

export default Home;
