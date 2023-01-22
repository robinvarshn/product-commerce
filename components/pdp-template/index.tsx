import AccordionWrapper from 'components/accordion';
import BingMaps from 'components/maps';
import { InfoBox } from 'components/maps/maps';
import MediaGallery from 'components/media-gallery';
import { MediaGalleryTypes } from 'components/media-gallery/media-gallery';
import ProductAccessories from 'components/product-accessories';
import ProductInfo from 'components/product-info';
import { ProductInfoTypes } from 'components/product-info/product-info.tsx';
import TabsWrapper from 'components/tabs';
import type { Tablist } from 'components/tabs/tabs';
import Text from 'components/text';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import type {
    FAQProps,
    PDPTemplateProps,
    PinsInfo,
    PinsObj,
    StoreProps,
    TabsComponentProps,
} from './pdp-template';

import '@layout/_pdp.scss';
import OfflineStoreWrapper from 'components/offline-stores';

const TryoutWrapper = dynamic(() => import('components/tryout'), {
    ssr: false,
});

const MediaGalleryComponent = (props: MediaGalleryTypes): JSX.Element => {
    return <MediaGallery {...props} />;
};

const TabsComponent = ({ tabInfo }: TabsComponentProps): JSX.Element => {
    const [tabList, setTabList] = useState<Tablist[]>([] as Tablist[]);

    const generateTabsData = (): void => {
        const _tabArr: Tablist[] = tabInfo.map((ele) => {
            const _tabObj = {} as Tablist;
            const TabContent = TabsMapper[ele.tag];
            _tabObj['tabHeader'] = ele.data?.title;
            _tabObj['tabContent'] = TabContent(ele.data);
            if (ele.tag === 'tryout') {
                _tabObj['forceRender'] = false;
            } else {
                _tabObj['forceRender'] = true;
            }
            return {
                ..._tabObj,
            };
        });

        setTabList(_tabArr);
    };

    useEffect(() => {
        generateTabsData();
    }, []);
    return (
        <React.Fragment>
            <TabsWrapper tabList={tabList} />
        </React.Fragment>
    );
};

const StoreComponent = ({ storeData, locationData }: StoreProps): JSX.Element => {
    return (
        <React.Fragment>
            <OfflineStoreWrapper {...storeData} />
            <MapsComponent {...locationData} />
        </React.Fragment>
    );
};

const MapsComponent = ({ title, pins }: PinsInfo): JSX.Element => {
    const generateInfoForPins = () => {
        const _pinsArr = [] as InfoBox[];
        pins &&
            pins.map((data: PinsObj) => {
                const _pinsObj = {} as InfoBox;
                (_pinsObj.location = data?.location),
                    (_pinsObj.addHandler = 'mouseover'),
                    (_pinsObj.infoboxOption = {
                        title: data?.title,
                        description: data?.description,
                    });
                _pinsObj.pushPinOption = {
                    title: '',
                };

                _pinsArr.push(_pinsObj);
            });

        return _pinsArr;
    };

    return (
        <React.Fragment>
            <BingMaps title={title} infoboxesWithPushPins={generateInfoForPins()} />
        </React.Fragment>
    );
};

const AccessoriesComponent = ({ accList }: { accList: string[] }): JSX.Element => {
    return (
        <React.Fragment>
            <ProductAccessories accList={accList} />
        </React.Fragment>
    );
};

const ProductInfoComponent = ({ productMeta, features, tags }: ProductInfoTypes): JSX.Element => {
    return (
        <React.Fragment>
            <ProductInfo productMeta={productMeta} features={features} tags={tags} />
        </React.Fragment>
    );
};

const TryOutComponent = ({ tryoutData }: { [x: string]: any }): JSX.Element => {
    return (
        <React.Fragment>
            <TryoutWrapper title={tryoutData.title} camError={tryoutData.camError} />
        </React.Fragment>
    );
};

const TabsMapper: { [x: string]: (props: any) => JSX.Element } = {
    info: ProductInfoComponent,
    accessories: AccessoriesComponent,
    stores: StoreComponent,
    tryout: TryOutComponent,
};

const FAQComponent = ({ faqHeader, faqData }: FAQProps): JSX.Element => {
    return (
        <React.Fragment>
            <Text textData={faqHeader} />
            <AccordionWrapper items={faqData} />
        </React.Fragment>
    );
};

const PDPTemplate = ({ MediaGalleryContent, TabInfo, FAQData }: PDPTemplateProps): JSX.Element => {
    const [pdpLoading, setPdpLoading] = useState<boolean>(true);
    return (
        <div className="pdp">
            <div className="pdp-data">
                <div className={`${pdpLoading && 'pdp-gallery-loading'} pdp-gallery`}>
                    <MediaGalleryComponent
                        pdpLoading={pdpLoading}
                        setPdpLoaded={setPdpLoading}
                        images={MediaGalleryContent}
                    />
                </div>
                <div className="pdp-content">
                    <TabsComponent tabInfo={TabInfo} />
                </div>
            </div>
            <div className="pdp-faq">
                <FAQComponent faqHeader={FAQData.faqHeader} faqData={FAQData.faqData} />
            </div>
        </div>
    );
};

export default PDPTemplate;
