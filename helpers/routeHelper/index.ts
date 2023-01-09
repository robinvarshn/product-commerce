import type { BreadcrumbData } from 'components/breadcrumb/breadcrumb';
import create from 'zustand';

export type BreadcrumbStore = {
    breadcrumbRoute: BreadcrumbData[];
    breadcrumbInitialRoute: BreadcrumbData[];
    setRoute: (payLoad: BreadcrumbData) => void;
};

export const breadcrumbStore = create<BreadcrumbStore>((set) => ({
    breadcrumbInitialRoute: [{ route: '/', routeName: 'Home' }],
    breadcrumbRoute: [],
    setRoute: (payLoad) =>
        set((state) => ({
            breadcrumbRoute: [...state.breadcrumbInitialRoute, payLoad],
        })),
}));
