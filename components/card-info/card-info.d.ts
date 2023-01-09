import { ObjectDetectionTypes } from 'components/object-detection/object-detection';
import { VoiceAsistantTypes } from 'components/voice-assistant/voice-assistant';

export type CardInfoTypes = {
    cardText: string;
    cardSubText?: string;
    cardIcon: string;
    cardType: string;
    type: string;
    modalData: ObjectDetectionTypes & VoiceAsistantTypes;
};
