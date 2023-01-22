import { useWindowSize } from '@react-hook/window-size/throttled';
import '@styles/_media-gallery.scss';
import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { MediaGalleryTypes, MediaImageObj } from './media-gallery';

const MediaGalleryConfig = {
    mobileRendition: 767,
};

const MediaGallery = ({ images, pdpLoading, setPdpLoaded }: MediaGalleryTypes): JSX.Element => {
    const [imagesData, setImagesData] = useState<any>([] as MediaImageObj[]);
    const [loading, setLoading] = useState<boolean>(true);
    const [propsLoad, setPropsLoad] = useState<boolean>(true);
    const [windowWidth] = useWindowSize({ fps: 60 });

    const generateConfigs = (): void => {
        let _imageSet = images.map((x) => {
            let _imgOb: any = {};
            _imgOb['loading'] = 'lazy';
            _imgOb['thumbnailLoading'] = 'lazy';
            return {
                ...x,
                ..._imgOb,
            };
        });

        setImagesData(_imageSet);
        setPropsLoad(false);
    };

    useEffect(() => {
        generateConfigs();
    }, []);
    return (
        <React.Fragment>
            {!propsLoad && (
                <ImageGallery
                    items={imagesData}
                    showPlayButton={false}
                    showIndex={true}
                    onImageLoad={() => setPdpLoaded(false)}
                    showFullscreenButton={false}
                    showBullets={!pdpLoading}
                    showNav={!pdpLoading}
                    showThumbnails={windowWidth > MediaGalleryConfig.mobileRendition ?? false}
                    thumbnailPosition={
                        windowWidth > MediaGalleryConfig.mobileRendition ? 'left' : 'bottom'
                    }
                />
            )}
        </React.Fragment>
    );
};

export default MediaGallery;
