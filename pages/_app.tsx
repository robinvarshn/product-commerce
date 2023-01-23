import { ApolloProvider } from '@apollo/client';
import { loginHandler, useCustomerLogin } from 'components/cart/useCustomerLogin';
import { cartIdGenerationHandler, useGetCartId } from 'components/cart/useGetCartId';
import Footer from 'components/layout/footer';
import { FooterData } from 'components/layout/footer/footer';
import Header from 'components/layout/header';
import { HeaderProps } from 'components/layout/header/header';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React, { ReactElement, useEffect } from 'react';
import 'regenerator-runtime/runtime';
import ScrollIndicator from 'scroll-indicator';

import client from '../apollo-client';

import '../styles/globalLayout.scss';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout: () => ReactElement;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

type LayoutProps = {
    children: ReactElement;
    headerData: HeaderProps;
    footerData: FooterData;
};

function AppLayout({ headerData, footerData, children }: LayoutProps) {
    const login = useCustomerLogin();
    const generateCartIdFn = useGetCartId();

    // Handler for setting up the cart on load
    const handleClientRequest = async () => {
        login && (await loginHandler(login));
        generateCartIdFn && (await cartIdGenerationHandler(generateCartIdFn));
    };

    // setup the cart id if not present
    useEffect(() => {
        !sessionStorage.getItem('token') && handleClientRequest();
        window.addEventListener('refresh', handleClientRequest);
        return () => window.removeEventListener('refresh', handleClientRequest);
    }, []);

    return (
        <React.Fragment>
            <Head>
                <link rel="shortcut icon" href="/header-logo.png" />
            </Head>
            <ScrollIndicator bgColor="#182847" height="4px" />
            {headerData && <Header {...headerData} />}
            <main className={`main-content`}>
                <NextNProgress color="#182847" />
                {children}
            </main>
            {footerData && <Footer footerData={footerData} />}
        </React.Fragment>
    );
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    const { headerData, footerData } = pageProps;
    const GernalLayout = Component.getLayout ?? (() => <></>);

    return (
        <ApolloProvider client={client}>
            <AppLayout headerData={headerData} footerData={footerData}>
                <React.Fragment>
                    <GernalLayout />
                    <Component {...pageProps} />
                </React.Fragment>
            </AppLayout>
        </ApolloProvider>
    );
}

export default App;
