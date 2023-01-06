import type React from 'react';

export type Tablist = {
    tabHeader: string;
    tabContent: React.ReactNode;
};

export type TabProps = {
    tabList: Tablist[];
};
