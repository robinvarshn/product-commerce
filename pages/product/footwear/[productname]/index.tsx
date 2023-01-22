import { aemHeadlessClient, queries } from 'aemHeadless';
import Breadcrumb from 'components/breadcrumb';
import { MediaImageObj } from 'components/media-gallery/media-gallery';
import PDPTemplate from 'components/pdp-template';
import Seo from 'components/seo';
import { mapImagesForGallery } from 'helpers/productImageHelper';
import { breadcrumbStore } from 'helpers/routeHelper';
import { capitalizeFirst } from 'helpers/stringHelper';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const FootwearCategory = (props: any) => {
    const { images, faqData, tabInfo }: { [x: string]: any } = props;
    const imagesMap: MediaImageObj[] = mapImagesForGallery(images);
    const router = useRouter();
    const setRoute = breadcrumbStore((state) => state.setRoute);

    useEffect(() => {
        if (router.query.productname) {
            setRoute({
                route: '/',
                routeName: capitalizeFirst(router.query.productname),
                isHref: true,
            });
        }
    }, [router.query]);
    return (
        <React.Fragment>
            {<Seo pageTitle={capitalizeFirst(router?.query?.productname)} />}
            <section>
                <PDPTemplate MediaGalleryContent={imagesMap} FAQData={faqData} TabInfo={tabInfo} />
            </section>
        </React.Fragment>
    );
};

FootwearCategory.getLayout = () => {
    const breadCrumbList = breadcrumbStore((state) => state.breadcrumbRoute);
    return <Breadcrumb list={breadCrumbList} />;
};

export const getStaticProps: GetStaticProps = async (context: any) => {
    const { params }: any = context;
    let imagePath = `${process.env.NEXT_AEM_PRODUCT_PATH}footwear/${params?.productname}/product-images`;
    let infoPath = `${process.env.NEXT_AEM_PRODUCT_PATH}footwear/${params?.productname}/tabinfo`;
    let productPageJSON = await aemHeadlessClient.runPersistedQuery(queries.productDetail, {
        imagePath,
        infoPath,
    });
    let { headerByPath, footerByPath, productMediaGalleryList, productInfoList, accordionByPath } =
        productPageJSON?.data;
    return {
        props: {
            headerData: { ...headerByPath?.item, isHref: true },
            footerData: footerByPath?.item,
            images: productMediaGalleryList?.items[0]?.original,
            tabInfo: productInfoList?.items[0]?.tabInfo?.tabInfo,
            faqData: accordionByPath?.item?.faq?.faq,
        },
    };
};

export function getStaticPaths() {
    return {
        paths: [{ params: { productname: 'shoes' } }],
        fallback: 'blocking',
    };
}

export default FootwearCategory;
