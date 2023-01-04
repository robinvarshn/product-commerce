import Head from 'next/head';
import React from 'react';
import { SeoProps } from './seo.types';

const Seo = ({ pageTitle = '' }: SeoProps): JSX.Element => {
    return (
        <React.Fragment>
            <Head>
                <title>{pageTitle}</title>
            </Head>
        </React.Fragment>
    );
};

export default Seo;
