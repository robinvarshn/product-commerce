import '@styles/_rating.scss';
import React from 'react';
import { RatingProps } from './rating';

const Rating = ({ rating }: RatingProps): JSX.Element => {
    const ratingStyle: React.CSSProperties & { '--rating': string } = {
        '--rating': rating,
    };
    return (
        <React.Fragment>
            {rating && (
                <div className="rating" style={{ ...ratingStyle }}>
                    ({rating})
                </div>
            )}
        </React.Fragment>
    );
};
export default Rating;
