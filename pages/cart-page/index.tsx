import { aemHeadlessClient, queries } from 'aemHeadless';
import CartView from 'components/cart/CartView';
import ClientOnly from 'components/ClientOnly';
import { breadcrumbStore } from 'helpers/routeHelper';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

const Breadcrumb = dynamic(() => import('components/breadcrumb'), {
    ssr: false,
});

const CartPage = () => {
    const setRoute = breadcrumbStore((state) => state.setRoute);
    useEffect(() => {
        setRoute({
            route: '/',
            routeName: 'Cart',
        });
    }, []);
    return (
        <React.Fragment>
            <ClientOnly>
                <CartView />
            </ClientOnly>
        </React.Fragment>
    );
};

CartPage.getLayout = () => {
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

export default CartPage;
