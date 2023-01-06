import '@styles/_media-gallery.scss';
import ImageGallery from 'react-image-gallery';
import { MediaGalleryTypes } from './media-gallery';

const MediaGallery = ({ images }: MediaGalleryTypes): JSX.Element => {
    return (
        <ImageGallery
            items={images}
            showPlayButton={false}
            showIndex={true}
            showBullets={true}
            showFullscreenButton={false}
            thumbnailPosition="left"
        />
    );
};

export default MediaGallery;
