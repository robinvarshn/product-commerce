import type * as cocossd from '@tensorflow-models/coco-ssd';
import { CanvasDetecType } from './object-detection.types';
import { KeywordMapper, ResultSet } from 'components/voice-assistant/utility';

const drawRect = (detections: cocossd.DetectedObject[], ctx: CanvasDetecType) => {
    detections.forEach((prediction) => {
        const [x, y, width, height] = prediction['bbox'];
        const text = prediction['class'];

        const color = '32CD32';
        if (ctx) {
            ctx.strokeStyle = '#' + color;
            ctx.font = '23px Arial';
            ctx.beginPath();
            ctx.fillStyle = '#' + color;
            ctx.fillText(text, x, y);
            ctx.rect(x, y, width, height);
            ctx.stroke();
        }
    });
};

const ResultMapper = (detections: cocossd.DetectedObject[]) => {
    let keywordRes = {} as ResultSet;
    let scoreFlag: number = 0;

    detections.forEach((prediction) => {
        const keyword = prediction['class'];
        const score = prediction['score'];

        if (score > 0.75 && score > scoreFlag) {
            scoreFlag = score;
            keywordRes = KeywordMapper(keyword);
        }
    });

    return keywordRes;
};

export { drawRect, ResultMapper };
