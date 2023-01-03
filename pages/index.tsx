import BingMaps from 'components/maps';
import React from 'react';
import getConfig from 'next/config';

const Home = (): JSX.Element => {
    const { publicRuntimeConfig } = getConfig();
    return <BingMaps mapsApiKey={publicRuntimeConfig.mapsApiKey} />;
    // return <></>;
};

export default Home;
