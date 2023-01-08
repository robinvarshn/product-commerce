import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React, { ReactElement } from 'react';
import '../styles/globalLayout.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: () => ReactElement;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

function AppLayout({ children }: { children: ReactElement }) {
    return (
        <React.Fragment>
            <Head>
                <link rel="shortcut icon" href="/header-logo.png" />
            </Head>
            <Header />
            <main className="main-content">
                <NextNProgress color="#103be6" />
                {children}
            </main>
            <Footer />
        </React.Fragment>
    );
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    const GernalLayout = Component.getLayout ?? (() => <></>);

    return (
        <AppLayout>
            <React.Fragment>
                <GernalLayout />
                <Component {...pageProps} />
            </React.Fragment>
        </AppLayout>
    );
}

export default App;
