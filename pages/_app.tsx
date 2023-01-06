import Footer from 'components/layout/footer';
import Header from 'components/layout/header';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React from 'react';
import 'regenerator-runtime/runtime';
import '../styles/globalLayout.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <React.Fragment>
            <Head>
                <link rel="shortcut icon" href="/header-logo.png" />
            </Head>
            <Header />
            <main className="main-content">
                <NextNProgress color="#103be6" />
                <Component {...pageProps} />
            </main>
            <Footer />
        </React.Fragment>
    );
}
