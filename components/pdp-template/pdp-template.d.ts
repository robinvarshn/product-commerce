import { AccordionType } from 'components/accordion/accordion';
import { MediaImageObj } from 'components/media-gallery/media-gallery';
import { OfflineStoreProps } from 'components/offline-stores/offline-stores';

export type PinsObj = {
    location: number[];
    title: string;
    description: string;
};

export type PinsInfo = {
    title: string;
    pins: PinsObj[];
};

export type TabsMapper = {
    tag: string;
    data: any;
};

export type TabsComponentProps = {
    tabInfo: TabsMapper[];
};

export type FAQProps = {
    faqData: AccordionType[];
    faqHeader: string;
};

export type StoreProps = {
    storeData: OfflineStoreProps;
    locationData: PinsInfo;
};

export type PDPTemplateProps = {
    MediaGalleryContent: MediaImageObj[];
    TabInfo: TabsMapper[];
    FAQData: FAQProps;
};
