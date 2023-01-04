import React from 'react';
import { TextProps } from './text.types';
import '@styles/_text.scss';

const Text = ({ textData }: TextProps): JSX.Element => {
    return (
        <React.Fragment>
            <div className="text">
                <span className="text__info">{textData}</span>
            </div>
        </React.Fragment>
    );
};

export default Text;
