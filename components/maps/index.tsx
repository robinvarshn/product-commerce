import { useWindowSize } from '@react-hook/window-size/throttled';
import '@styles/_maps.scss';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { InfoContainer } from './maps';

const ReactBingmaps = dynamic(() => import('@/maps'), { ssr: false });

const MapsConfig = {
    mobileRendition: 767,
};

const BingMaps = ({ title, infoboxesWithPushPins }: InfoContainer): JSX.Element => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const { publicRuntimeConfig } = getConfig();
    const [windowWidth] = useWindowSize({ fps: 60 });

    const getLocation = () => {
        if (!navigator.geolocation) {
            return;
        } else {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLat(position.coords.latitude);
                    setLng(position.coords.longitude);
                },
                () => {},
            );
        }
    };

    useEffect(() => {
        getLocation();
    }, []);

    return (
        <div className="bing">
            {lat && lng && (
                <React.Fragment>
                    {title && <p className="bing-title">{title}</p>}
                    <div className="bing-maps">
                        <ReactBingmaps
                            zoom={windowWidth > MapsConfig.mobileRendition ? 12 : 11}
                            id="maps"
                            center={[lat, lng]}
                            bingmapKey={publicRuntimeConfig.mapsApiKey}
                            infoboxesWithPushPins={infoboxesWithPushPins}
                        ></ReactBingmaps>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default BingMaps;
