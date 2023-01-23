import '@styles/_default.scss';
import '@styles/_shipping.scss';
import { aemHeadlessClient, queries } from 'aemHeadless';
import ShippingDetails from 'components/address-component/shipping-details';
import ClientOnly from 'components/ClientOnly';
import { breadcrumbStore } from 'helpers/routeHelper';
import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Breadcrumb = dynamic(() => import('components/breadcrumb'), {
    ssr: false,
});

const ShippingDetailsPage = () => {
    const setRoute = breadcrumbStore((state) => state.setRoute);

    useEffect(() => {
        setRoute({
            route: '/',
            routeName: 'Shipping Details',
        });
    }, []);
    return (
        <>
            <ClientOnly>
                <ShippingDetails />
            </ClientOnly>
        </>
    );
};

ShippingDetailsPage.getLayout = () => {
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

export default ShippingDetailsPage;
