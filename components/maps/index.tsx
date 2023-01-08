import '@styles/_maps.scss';
import getConfig from 'next/config';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { InfoContainer } from './maps';

const ReactBingmaps = dynamic(() => import('@/maps'), { ssr: false });

const BingMaps = ({ infoboxesWithPushPins }: InfoContainer): JSX.Element => {
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);
    const { publicRuntimeConfig } = getConfig();

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
                <div className="bing-maps">
                    <ReactBingmaps
                        zoom={10}
                        id="maps"
                        center={[lat, lng]}
                        bingmapKey={publicRuntimeConfig.mapsApiKey}
                        infoboxesWithPushPins={infoboxesWithPushPins}
                    ></ReactBingmaps>
                </div>
            )}
        </div>
    );
};

export default BingMaps;
