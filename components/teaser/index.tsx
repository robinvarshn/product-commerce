import '@styles/_teaser.scss';
import Text from 'components/text';
import Image from 'next/image';
import React from 'react';
import { TeaserProps } from './teaser';

const Teaser = ({ imageURL, fallBackURL, title }: TeaserProps): JSX.Element => {
    return (
        <React.Fragment>
            <div className={`teaser`}>
                <div className="cmp-teaser">
                    <div className="cmp-teaser__text">
                        <Text textData={title} />
                    </div>
                    <div className="cmp-teaser__image">
                        {imageURL && (
                            <Image
                                src={imageURL}
                                fill={true}
                                alt={''}
                                placeholder="blur"
                                blurDataURL={fallBackURL}
                            />
                        )}
                        <div className="cmp-teaser__divider" />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Teaser;
