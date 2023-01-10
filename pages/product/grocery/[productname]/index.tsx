import Breadcrumb from 'components/breadcrumb';
import PDPTemplate from 'components/pdp-template';
import Seo from 'components/seo';
import { breadcrumbStore } from 'helpers/routeHelper';
import { capitalizeFirst } from 'helpers/stringHelper';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';
import ProductInfo from '../../../../sample/capscium.json';
import FooterData from '../../../../sample/footer.json';
import HeaderData from '../../../../sample/header.json';

const GroceryCategory = ({ productname, ...props }: { productname: string }) => {
    const { images, faqData, tabInfo }: { [x: string]: any } = props;
    const setRoute = breadcrumbStore((state) => state.setRoute);

    useEffect(() => {
        setRoute({
            route: '/',
            routeName: capitalizeFirst(productname),
        });
    }, []);
    return (
        <React.Fragment>
            {<Seo pageTitle={capitalizeFirst(productname)} />}
            <section>
                <PDPTemplate MediaGalleryContent={images} FAQData={faqData} TabInfo={tabInfo} />
            </section>
        </React.Fragment>
    );
};

GroceryCategory.getLayout = () => {
    const breadCrumbList = breadcrumbStore((state) => state.breadcrumbRoute);
    return <Breadcrumb list={breadCrumbList} />;
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    return {
        props: {
            headerData: HeaderData,
            footerData: FooterData,
            images: ProductInfo?.productImages,
            faqData: ProductInfo?.faq,
            tabInfo: ProductInfo?.tabInfo,
            productname: context.query?.productname,
        },
    };
};

export default GroceryCategory;
