export type MediaImageObj = {
    original: string;
    thumbnail: string;
    loading?: string;
    thumbnailLoading?: string;
};

export type MediaGalleryTypes = {
    images: MediaImageObj[];
};
