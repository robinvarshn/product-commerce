import AccordionWrapper from 'components/accordion';
import BingMaps from 'components/maps';
import { InfoBox } from 'components/maps/maps';
import { MediaGalleryTypes } from 'components/media-gallery/media-gallery';
import TabsWrapper from 'components/tabs';
import type { Tablist } from 'components/tabs/tabs';
import Text from 'components/text';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import type { FAQProps, PDPTemplateProps, PinsInfo, TabsComponentProps } from './pdp-template';

const MediaGallery = dynamic(() => import('components/media-gallery'), {
    ssr: false,
});

const MediaGalleryComponent = (props: MediaGalleryTypes): JSX.Element => {
    return <MediaGallery {...props} />;
};

const TabsComponent = ({ tabInfo }: TabsComponentProps): JSX.Element => {
    const [tabList, setTabList] = useState<Tablist[]>([] as Tablist[]);

    const generateTabsData = (): void => {
        let _tabArr: Tablist[] = tabInfo.map((ele) => {
            let _tabObj = {} as Tablist;
            let TabContent = TabsMapper[ele.tag];
            _tabObj['tabHeader'] = ele.data?.title;
            _tabObj['tabContent'] = TabContent(ele.data);
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

const MapsComponent = ({ locationData }: { locationData: PinsInfo[] }): JSX.Element => {
    const generateInfoForPins = () => {
        let _pinsArr = [] as InfoBox[];
        locationData &&
            locationData.map((data: PinsInfo) => {
                let _pinsObj = {} as InfoBox;
                (_pinsObj.location = data?.location),
                    (_pinsObj.addHandler = 'mouseover'),
                    (_pinsObj.infoboxOption = {
                        title: data?.title,
                    });
                _pinsObj.pushPinOption = {
                    title: data?.title,
                    description: data?.description,
                };

                _pinsArr.push(_pinsObj);
            });

        return _pinsArr;
    };

    return (
        <React.Fragment>
            <BingMaps infoboxesWithPushPins={generateInfoForPins()} />
        </React.Fragment>
    );
};

const AccessoriesComponent = (): JSX.Element => {
    return <React.Fragment></React.Fragment>;
};

const ProductInfoComponent = (): JSX.Element => {
    return <React.Fragment></React.Fragment>;
};

const TabsMapper: { [x: string]: (props?: any) => JSX.Element } = {
    info: ProductInfoComponent,
    accessories: AccessoriesComponent,
    stores: MapsComponent,
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
    return (
        <div className="pdp">
            <div className="pdp-data">
                <div className="pdp-gallery">
                    <MediaGalleryComponent images={MediaGalleryContent} />
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
