import type React from 'react';

export type Tablist = {
    tabHeader: string;
    tabContent: React.ReactNode;
    forceRender: boolean;
};

export type TabProps = {
    tabList: Tablist[];
};
