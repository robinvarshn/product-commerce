import { AccordionType } from 'components/accordion/accordion';
import { MediaImageObj } from 'components/media-gallery/media-gallery';

export type PinsInfo = {
    location: number[];
    title: string;
    description: string;
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

export type PDPTemplateProps = {
    MediaGalleryContent: MediaImageObj[];
    TabInfo: TabsMapper[];
    FAQData: FAQProps;
};
