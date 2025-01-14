import '@styles/_object-detection.scss';
import type * as cocossd from '@tensorflow-models/coco-ssd';
import { load } from '@tensorflow-models/coco-ssd/dist/index';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-converter';
import { ResultSet } from 'components/voice-assistant/utility';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import Webcam from 'react-webcam';
import { ObjectDetectionTypes } from './object-detection';
import { drawRect, ResultMapper } from './utilities';

const RouteDelay = 2500;

const ObjectDetection = ({ title, subInfo, camError }: ObjectDetectionTypes): JSX.Element => {
    const [isWebcamError, setWebCamError] = useState<boolean>(false);
    const matchRef = useRef<boolean>(false);
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
            matchRef.current = true;
            setTimeout(() => {
                router.push(`/product/${resultSet.category}/${resultSet.keyword}`);
            }, RouteDelay);
            tf.dispose();
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
            !matchRef.current && keywordDecision(resultSet);
        }
    };

    const initialCoco = async () => {
        const net: cocossd.ObjectDetection = await load();
        setInterval(() => {
            !matchRef.current && detectObj(net);
        }, 10);
    };

    const videoConstraints = {
        facingMode: isMobile ? 'environment' : 'user',
    };

    useEffect(() => {
        tf.ready().then(() => {
            initialCoco();
        });
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
                                    videoConstraints={{ ...videoConstraints }}
                                />
                                <canvas
                                    height={480}
                                    width={640}
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

export default React.memo(ObjectDetection);
