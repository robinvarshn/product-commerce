import { useWindowSize } from '@react-hook/window-size/throttled';
import '@styles/_media-gallery.scss';
import ImageGallery from 'react-image-gallery';
import { MediaGalleryTypes } from './media-gallery';

const MediaGalleryConfig = {
    mobileRendition: 767,
};

const MediaGallery = ({ images }: MediaGalleryTypes): JSX.Element => {
    const [windowWidth] = useWindowSize({ fps: 60 });
    return (
        <div>
            <ImageGallery
                items={images}
                showPlayButton={false}
                showIndex={true}
                showBullets={true}
                showFullscreenButton={false}
                thumbnailPosition={
                    windowWidth > MediaGalleryConfig.mobileRendition ? 'left' : 'bottom'
                }
            />
        </div>
    );
};

export default MediaGallery;
