import '@styles/_maps.scss';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import MapsData from '../../sample/locationInfo.json';
import { BingMapsProps, InfoContainer } from './maps';

const ReactBingmaps = dynamic(() => import('@/maps'), { ssr: false });

const BingMaps = ({ mapsApiKey }: BingMapsProps): JSX.Element => {
    const [info, setInfo] = useState<InfoContainer>({} as InfoContainer);
    const [lat, setLat] = useState<number | null>(null);
    const [lng, setLng] = useState<number | null>(null);

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
        setInfo(MapsData);
    }, []);

    return (
        <div className="bing">
            {lat && lng && (
                <div className="bing-maps">
                    <ReactBingmaps
                        zoom={10}
                        id="maps"
                        center={[lat, lng]}
                        bingmapKey={mapsApiKey}
                        infoboxesWithPushPins={info.infoboxesWithPushPins}
                    ></ReactBingmaps>
                </div>
            )}
        </div>
    );
};

export default BingMaps;
