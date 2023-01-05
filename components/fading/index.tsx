import React, { useEffect, useRef, useState } from 'react';
import { FadeInProps } from './fading.types';
import '@styles/_fading.scss';

const FadeInSection = ({ children, type }: FadeInProps) => {
    const [isVisible, setVisible] = useState<boolean>(false);
    const [isIntersected, setIntersected] = useState<boolean>(false);
    const domRef = useRef<any>();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setVisible(entry.isIntersecting);
            });
        });
        observer.observe(domRef.current);
    }, []);

    useEffect(() => {
        if (isVisible) {
            setIntersected(true);
        }
    }, [isVisible]);

    return (
        <div
            className={`fade-in-section ${isIntersected ? 'is-visible' : ''} ${type}`}
            ref={domRef}
        >
            {children}
        </div>
    );
};

export default FadeInSection;
