export type MediaImageObj = {
    original: string;
    thumbnail: string;
};

export type MediaGalleryTypes = {
    images: MediaImageObj[];
    pdpLoading: boolean;
    setPdpLoaded: React.Dispatch<React.SetStateAction<boolean>>;
};
