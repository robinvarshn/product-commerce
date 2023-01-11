import '@styles/_tryon.scss';
import getConfig from 'next/config';
import React, { useEffect, useRef, useState } from 'react';
import { isIOS, isMobile } from 'react-device-detect';
import Webcam from 'react-webcam';
import 'regenerator-runtime/runtime';
import DeepAR from './configs/deep';
import { EFFECT, FMO, FTA, FTI, MDA, MDI, PE, WASM } from './configs/resources.js';

const TryoutWrapper = ({ title, camError }: { [x: string]: string }): JSX.Element => {
    const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
    const webcamRef = useRef<Webcam>({} as Webcam);
    const [isWebcamError, setWebCamError] = useState<boolean>(false);
    const { publicRuntimeConfig } = getConfig();
    let deepAR: any = null;

    const initializeAR = () => {
        deepAR = new DeepAR({
            licenseKey: publicRuntimeConfig.deepARKey,
            canvas: canvasRef?.current,
            deeparWasmPath: WASM,
            footTrackingConfig: {
                poseEstimationWasmPath: PE,
                detectorPath: isIOS ? MDI : MDA,
                trackerPath: isIOS ? FTI : FTA,
                objPath: FMO,
            },
            callbacks: {
                onInitialize: function () {
                    deepAR.swi;
                    deepAR.switchEffect(0, 'mask', EFFECT, function () {
                        deepAR.setVideoElement(webcamRef?.current?.video, isMobile ? true : false);
                    });
                },
            },
        });
    };

    useEffect(() => {
        //cleanup
        return () => {
            deepAR?.shutdown();
            deepAR?.stopVideo();
        };
    }, []);

    const videoConstraints = {
        facingMode: isMobile ? 'environment' : 'user',
    };

    return (
        <div className="tryon">
            {!isWebcamError && <div className="tryon__title">{title}</div>}
            <div className={`tryon__container ${isWebcamError && 'tryon__container-error'}`}>
                {isWebcamError ? (
                    <div className="tryon__error">{camError}</div>
                ) : (
                    <React.Fragment>
                        <div className="tryon__context">
                            <Webcam
                                ref={webcamRef}
                                muted={true}
                                className="tryon__video"
                                onUserMedia={() => initializeAR()}
                                onUserMediaError={() => setWebCamError(true)}
                                videoConstraints={{ ...videoConstraints }}
                            />
                            <canvas
                                ref={canvasRef}
                                className="tryon__canvas"
                                onContextMenu={(
                                    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>,
                                ) => event.preventDefault()}
                            />
                        </div>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default TryoutWrapper;
