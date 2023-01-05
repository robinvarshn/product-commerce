import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '@styles/_voice-assistant.scss';
import { ReactSVG } from 'react-svg';
import { KeywordMapper, ResultSet } from './utility';

const VoiceAssistant = (): JSX.Element => {
    const [voiceError, setVoiceError] = useState<string>('');
    const [voiceWarn, setVoiceWarn] = useState<string>('');
    const [isTranscript, setTransDecision] = useState<boolean>(false);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
    } = useSpeechRecognition();

    if (!browserSupportsSpeechRecognition) {
        setVoiceError("Browser doesn't support speech recognition.");
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
                setVoiceWarn('No result found with the given keyword');
            } else {
                console.log('Match found');
            }
        } else if (!listening && !transcript.length && isMicrophoneAvailable) {
            setTransDecision(true);
            setVoiceWarn('There was no input from your end');
        } else {
            setTransDecision(false);
        }
    };

    useEffect(() => {
        if (isMicrophoneAvailable) {
            SpeechRecognition.startListening();
        } else {
            setVoiceError('Microphone is turned off. Please enable it');
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
                            Try Again ?
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
