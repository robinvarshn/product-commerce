import Breadcrumb from 'components/breadcrumb';
import PDPTemplate from 'components/pdp-template';
import Seo from 'components/seo';
import { breadcrumbStore } from 'helpers/routeHelper';
import { capitalizeFirst } from 'helpers/stringHelper';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React, { useEffect } from 'react';

const accList = [
    '20W USB-C Power Adapter',
    'MagSafe Charger',
    'USB-C to Lightning Cable (1m)',
    'MagSafe Battery Pack',
    'MagSafe Duo Charger',
    'Lightning Digital AV Adapter',
];

const productFeatures = [
    'Dual Camera Setup at the backside',
    '12MP Front Camera with Retina Flash',
    'Apple A15 Bionic Chipset',
    '6GB RAM and 128GB Internal Memory',
    'Li-ion battery with 20W Fast Charging',
    'iOS v16Water-resistant',
];

const productTags = ['IOS', 'Dustfree', 'Siri', 'Privacy'];

const tabInfo = [
    {
        tag: 'info',
        data: {
            features: productFeatures,
            tags: productTags,
            title: 'Product Info',
        },
    },

    {
        tag: 'accessories',
        data: {
            accList: accList,
            title: 'Accessories',
        },
    },

    {
        tag: 'stores',
        data: {
            title: 'Stores',
            locationData: {
                pins: [
                    {
                        location: [12.93215015322209, 77.685281734820368],
                        title: 'Poorvika Mobiles Marathahalli - Ashwath Nagar',
                        description: '',
                    },
                    {
                        location: [12.927592884950197, 77.67624889054805],
                        title: 'Cashify Store Marathahalli',
                        description: '',
                    },
                    {
                        location: [12.957316954808869, 77.69978667661874],
                        title: 'Galaxy Mobile',
                        description: '',
                    },
                    {
                        location: [12.958801652897801, 77.70155693449493],
                        title: 'SUNIL MOBILE AND ELECTRONICS',
                        description: '',
                    },
                    {
                        location: [12.925736129496455, 77.69298985163958],
                        title: 'Mobile Gallery',
                        description: '',
                    },
                ],
                title: 'Offline Stores Near You',
            },
            storeData: {
                title: 'Shop It Online',
                vendors: ['fk', 'am'],
            },
        },
    },
];

const images = [
    {
        original: '/iphone-0.webp',
        thumbnail: '/iphone-0.webp',
    },
    {
        original: '/iphone-1.webp',
        thumbnail: '/iphone-1.webp',
    },
    {
        original: '/iphone-2.webp',
        thumbnail: '/iphone-2.webp',
    },
    {
        original: '/iphone-3.webp',
        thumbnail: '/iphone-3.webp',
    },
    {
        original: '/iphone-4.webp',
        thumbnail: '/iphone-4.webp',
    },
    {
        original: '/iphone-5.webp',
        thumbnail: '/iphone-5.webp',
    },
];

const faqData = {
    faqData: [
        {
            header: 'Can I choose expedited shipping?',
            content: `Yes, we offer expedited FedEx services at checkout: FedEx Ground and FedEx 2 Day. Please note that when you select expedited shipping, this does not account for the order processing time of a particular product. The specific timeframe for processing and shipping can be seen directly on the product's page above the Add to Cart button.`,
        },
        {
            header: `Do you offer protection against fraud?`,
            content: `Yes, Retail AI provides monetary compensation against the orders where the returned products have been damaged/ missing under 'Seller Protection Fund (SPF)' program.`,
        },
        {
            header: `What is a Offer Display?`,
            content: `Offer Display is a white box on the right side of the product detail page where customers can add products for purchase. Only seller with excellent metrics and performance can avail the Offer Display.`,
        },
        {
            header: `Do you offer protection against fraud?`,
            content: `Yes. Retail AI helps you protect against fraudulent orders placed on your products and payment fraud.`,
        },
        {
            header: `Why are there different prices for the same product? Is it legal?`,
            content: `Retail AI is an online marketplace platform that enables independent sellers to sell their products to buyers. The prices are solely decided by the sellers, and Retail AI does not interfere in the same. There could be a possibility that the same product is sold by different sellers at different prices. Retail AI rightfully fulfils all legal compliances of onboarding multiple sellers on its forum as it is a marketplace platform.`,
        },
    ],
    faqHeader: 'Freqently Asked Questions',
};

const ElectronicCategory = ({ productname }: { productname: string }) => {
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
                <PDPTemplate
                    MediaGalleryContent={images}
                    FAQData={faqData}
                    TabInfo={tabInfo}
                />
            </section>
        </React.Fragment>
    );
};

ElectronicCategory.getLayout = () => {
    const breadCrumbList = breadcrumbStore((state) => state.breadcrumbRoute);
    return <Breadcrumb list={breadCrumbList} />;
};

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    return {
        props: { productname: context.query?.productname },
    };
};

export default ElectronicCategory;
