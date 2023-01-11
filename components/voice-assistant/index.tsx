import '@styles/_voice-assistant.scss';
import { NextRouter, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ReactSVG } from 'react-svg';
import 'regenerator-runtime/runtime';
import { KeywordMapper, ResultSet } from './utility';
import { VoiceAsistantTypes } from './voice-assistant';

const VoiceAssistant = ({
    browserError,
    noRes,
    noIP,
    micError,
    tryAgain,
}: VoiceAsistantTypes): JSX.Element => {
    const [voiceError, setVoiceError] = useState<string>('');
    const [voiceWarn, setVoiceWarn] = useState<string>('');
    const [isTranscript, setTransDecision] = useState<boolean>(false);
    const router: NextRouter = useRouter();
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        setVoiceError(browserError);
    }

    const resetMic = (): void => {
        setTransDecision(false);
        resetTranscript;
        SpeechRecognition.startListening();
    };

    const listenHandler = () => {
        if (!listening && transcript.length) {
            const checkPrediction: ResultSet = KeywordMapper(transcript);
            if (!Object.keys(checkPrediction).length) {
                setTransDecision(true);
                setVoiceWarn(noRes);
            } else {
                router.push(`/product/${checkPrediction.category}/${checkPrediction.keyword}`);
            }
        } else if (!listening && !transcript.length && isMicrophoneAvailable) {
            setTransDecision(true);
            setVoiceWarn(noIP);
        } else {
            setTransDecision(false);
        }
    };

    useEffect(() => {
        if (isMicrophoneAvailable) {
            SpeechRecognition.startListening();
        } else {
            setVoiceError(micError);
        }
        () => {
            SpeechRecognition.stopListening();
        };
    }, [isMicrophoneAvailable]);

    useEffect(() => {
        listenHandler();
    }, [listening]);

    return (
        <div className="voice">
            <div className="voice-data">
                {isTranscript ? (
                    <div className="voice-notranscript">
                        <p className="voice-warn">{voiceWarn}</p>
                        <button className="voice-try" onClick={() => resetMic()}>
                            {tryAgain}
                        </button>
                    </div>
                ) : (
                    <React.Fragment>
                        {voiceError && <div className="voice-error">{voiceError}</div>}
                        {!voiceError && (
                            <div
                                className={`voice-transdata ${
                                    !transcript.length && 'voice-listening'
                                }`}
                            >
                                {transcript.length ? transcript : 'Listening...'}
                            </div>
                        )}
                    </React.Fragment>
                )}
            </div>

            <div className={`voice-mic ${!isTranscript && !voiceError && 'voice-listen'}`}>
                <ReactSVG
                    className="voice-vector"
                    src={'/mic.svg'}
                    beforeInjection={(svg) => {
                        svg.classList.add('svg');
                    }}
                />
            </div>
        </div>
    );
};

export default VoiceAssistant;
