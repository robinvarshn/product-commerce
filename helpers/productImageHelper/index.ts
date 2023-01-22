import { MediaImageObj } from 'components/media-gallery/media-gallery';
import getConfig from 'next/config';

type ImageMap = {
    _path: string;
};

function mapImagesForGallery(imageArr: ImageMap[]) {
    const { publicRuntimeConfig } = getConfig();
    let imageMaps = [];
    imageMaps = imageArr?.map((x: ImageMap) => {
        let map = {} as MediaImageObj;
        map.original = `${publicRuntimeConfig.aemPublishUrl}${x?._path}`;
        map.thumbnail = `${publicRuntimeConfig.aemPublishUrl}${x?._path}`;
        return {
            ...map,
        };
    });
    return imageMaps;
}

export { mapImagesForGallery };
