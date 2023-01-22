export type BreadcrumbData = {
    route: string;
    routeName: string;
    isHref?: boolean;
};

export type BreadcrumbTypes = {
    list: BreadcrumbData[];
};
