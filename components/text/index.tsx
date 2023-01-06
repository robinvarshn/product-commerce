import '@styles/_text.scss';
import React from 'react';
import { TextProps } from './text';

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
