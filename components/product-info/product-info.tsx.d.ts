export type ProductMeta = {
    title: string;
    rating: string;
    reviews: string;
    price: string;
};

export type ProductTags = {
    title: string;
    tags: string[];
};

export type ProductFeatures = {
    title: string;
    features: string[];
};

export type ProductInfoTypes = {
    features: ProductFeatures;
    tags: ProductTags;
    productMeta: ProductMeta;
};
