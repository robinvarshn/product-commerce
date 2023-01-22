type LogoContent = {
    _path: string;
};

export type FooterData = {
    copyRightContent: string;
    copyRightLogo: string;
    brandLogo: LogoContent;
    footerQuickLinks: string[];
};

export type FooterProps = {
    footerData: FooterData;
};
