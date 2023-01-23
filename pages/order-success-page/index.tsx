import { aemHeadlessClient, queries } from 'aemHeadless';
import ClientOnly from 'components/ClientOnly';
import OrderSuccess from 'components/order-success';
import { breadcrumbStore } from 'helpers/routeHelper';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

const Breadcrumb = dynamic(() => import('components/breadcrumb'), {
    ssr: false,
});

const OrderSuccessPage = () => {
    const setRoute = breadcrumbStore((state) => state.setRoute);
    useEffect(() => {
        setRoute({
            route: '/',
            routeName: 'OrderSuccessPage',
        });
    }, []);
    return (
        <React.Fragment>
            <ClientOnly>
                <OrderSuccess />
            </ClientOnly>
        </React.Fragment>
    );
};

OrderSuccessPage.getLayout = () => {
    const breadCrumbList = breadcrumbStore((state) => state.breadcrumbRoute);
    return <Breadcrumb list={breadCrumbList} />;
};

export const getStaticProps: GetStaticProps = async () => {
    let homePageJson = await aemHeadlessClient.runPersistedQuery(queries.homePage);
    let { footerByPath, headerByPath } = homePageJson?.data;
    return {
        props: {
            headerData: headerByPath?.item,
            footerData: footerByPath?.item,
        },
    };
};

export default OrderSuccessPage;
