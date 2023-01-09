import '@styles/_object-detection.scss';
import type * as cocossd from '@tensorflow-models/coco-ssd';
import { load } from '@tensorflow-models/coco-ssd/dist/index';
import '@tensorflow/tfjs';
import { ResultSet } from 'components/voice-assistant/utility';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { ObjectDetectionTypes } from './object-detection';
import { drawRect, ResultMapper } from './utilities';

const ObjectDetection = ({
    title,
    subInfo,
    camError,
}: ObjectDetectionTypes): JSX.Element => {
    const [isWebcamError, setWebCamError] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>({} as Webcam);
    const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
    const router: NextRouter = useRouter();

    const setCanvas = (video: HTMLVideoElement) => {
        const parentEle = video?.parentElement;
        const videoWidth = parentEle?.offsetWidth;
        const videoHeight = parentEle?.offsetHeight;

        if (webcamRef?.current?.video && videoWidth && videoHeight) {
            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
        }
    };

    const keywordDecision = (resultSet: ResultSet) => {
        if (Object.keys(resultSet).length) {
            router.push(`/product/${resultSet.category}/${resultSet.keyword}`);
        }
    };

    const detectObj = async (net: cocossd.ObjectDetection) => {
        if (
            typeof webcamRef.current !== 'undefined' &&
            webcamRef?.current?.video?.readyState === 4
        ) {
            const video = webcamRef.current?.video;
            setCanvas(video);
            const obj = await net.detect(video);
            const ctx = canvasRef.current?.getContext('2d');
            const resultSet: ResultSet = ResultMapper(obj);
            drawRect(obj, ctx);
            keywordDecision(resultSet);
        }
    };

    const initialCoco = async () => {
        const net: cocossd.ObjectDetection = await load();
        setInterval(() => {
            detectObj(net);
        }, 10);
    };

    useEffect(() => {
        initialCoco();
    }, []);

    return (
        <div className="object-detection">
            {isWebcamError ? (
                <div className="object-detection__error">{camError}</div>
            ) : (
                <React.Fragment>
                    <div className="object-detection__data">
                        <div className="object-detection__desc">
                            <p className="object-detection__header">{title}</p>
                        </div>
                        <div className="object-detection__container">
                            <div className="object-detection__img">
                                <Webcam
                                    ref={webcamRef}
                                    muted={true}
                                    className="object-detection__video"
                                    onUserMediaError={() => setWebCamError(true)}
                                />
                                <canvas
                                    ref={canvasRef}
                                    className="object-detection__canvas"
                                />
                            </div>
                        </div>
                        <div className="object-detection__disc">
                            <p className="object-detection__note">{subInfo}</p>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </div>
    );
};

export default ObjectDetection;
