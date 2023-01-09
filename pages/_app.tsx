import Footer from 'components/layout/footer';
import { FooterProps } from 'components/layout/footer/footer';
import Header from 'components/layout/header';
import { HeaderProps } from 'components/layout/header/header';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import NextNProgress from 'nextjs-progressbar';
import React, { ReactElement } from 'react';
import ScrollIndicator from 'scroll-indicator';
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
    footerData: FooterProps;
};

function AppLayout({ headerData, footerData, children }: LayoutProps) {
    return (
        <React.Fragment>
            <Head>
                <link rel="shortcut icon" href="/header-logo.png" />
            </Head>
            <ScrollIndicator bgColor="#182847" height="4px" />
            <Header {...headerData} />
            <main className={`main-content`}>
                <NextNProgress color="#182847" />
                {children}
            </main>
            <Footer {...footerData} />
        </React.Fragment>
    );
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    const { headerData, footerData } = pageProps;
    const GernalLayout = Component.getLayout ?? (() => <></>);

    return (
        <AppLayout headerData={headerData} footerData={footerData}>
            <React.Fragment>
                <GernalLayout />
                <Component {...pageProps} />
            </React.Fragment>
        </AppLayout>
    );
}

export default App;
