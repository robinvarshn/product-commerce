import '@styles/_accordion.scss';
import React, { useRef, useState } from 'react';
import { AccordionProps, AccordionType } from './accordion';

const AccordionItemWrapper = ({ header, content }: AccordionType): JSX.Element => {
    const [isOpen, setOpen] = useState<boolean>(false);
    const [contentOffset, setContentOffset] = useState<string>('0');
    const contentRef = useRef<HTMLDivElement>(null);

    const toggleItem = (): void => {
        if (!isOpen) {
            setContentOffset(`${contentRef.current?.scrollHeight}` + 'px');
        } else {
            setContentOffset('0px');
        }

        setOpen((prevValue) => !prevValue);
    };

    return (
        <React.Fragment>
            <div className="accordion__item">
                <div className="accordion__heading">
                    <button
                        className={`accordion__button ${
                            isOpen && `accordion__button-open`
                        }`}
                        onClick={() => toggleItem()}
                    >
                        {header}
                    </button>
                </div>
                <div
                    ref={contentRef}
                    style={{ maxHeight: contentOffset }}
                    className={`accordion__panel`}
                >
                    <p>{content}</p>
                </div>
            </div>
        </React.Fragment>
    );
};

const AccordionWrapper = ({ items }: AccordionProps): JSX.Element => {
    return (
        <div className="accordion">
            {items.map((data, index) => (
                <React.Fragment key={index}>
                    <AccordionItemWrapper header={data?.header} content={data?.content} />
                </React.Fragment>
            ))}
        </div>
    );
};

export default AccordionWrapper;
