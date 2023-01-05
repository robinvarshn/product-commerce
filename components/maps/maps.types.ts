export type InfoData = {
    title: string;
    description: string;
};

export type InfoBox = {
    location: number[];
    addHandler: string;
    infoboxOption: InfoData;
    pushPinOption: InfoData;
};

export type InfoContainer = {
    infoboxesWithPushPins: InfoBox[];
};

export type BingMapsProps = {
    mapsApiKey: string;
};
