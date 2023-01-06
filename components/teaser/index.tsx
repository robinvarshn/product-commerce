import '@styles/_teaser.scss';
import Text from 'components/text';
import Image from 'next/legacy/image';
import React from 'react';
import { TeaserProps } from './teaser';

const Teaser = ({ imageURL }: TeaserProps): JSX.Element => {
    return (
        <React.Fragment>
            <div className={`teaser`}>
                <div className="cmp-teaser">
                    <div className="cmp-teaser__text">
                        <Text textData="Retail AI: The Next GEN Online Purchase Solution" />
                    </div>
                    <div className="cmp-teaser__image">
                        {imageURL && (
                            <Image priority src={`/hero-banner.jpeg`} layout="fill" alt={''} />
                        )}
                        <div className="cmp-teaser__divider" />
                        {/* placeholder="blur" blurDataURL={''} */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Teaser;
