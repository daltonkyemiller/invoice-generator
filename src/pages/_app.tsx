// src/pages/_app.tsx
import '../styles/globals.css';
import type { AppType } from 'next/app';
import { trpc } from '../utils/trpc';
import { Theme } from 'react-daisyui';

const MyApp: AppType = ({ Component, pageProps }) => {
    return (
        <Theme dataTheme="mytheme">
            <Component {...pageProps} />
        </Theme>
    );
};

export default trpc.withTRPC(MyApp);
