import React, { useEffect, useState } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import '@styles/_voice-assistant.scss';
import { ReactSVG } from 'react-svg';

const VoiceAssistant = (): JSX.Element => {
    const [voiceError, setVoiceError] = useState<string>('');
    const [isTranscript, setTransDecision] = useState<boolean>(false);

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
        isMicrophoneAvailable,
    } = useSpeechRecognition();

    const resetMic = (): void => {
        setTransDecision(false);
        resetTranscript;
        SpeechRecognition.startListening();
    };

    if (!browserSupportsSpeechRecognition) {
        setVoiceError("Browser doesn't support speech recognition.");
    }

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
        if (!listening && !transcript.length && isMicrophoneAvailable) {
            setTransDecision(true);
        } else {
            setTransDecision(false);
        }
    }, [listening]);

    return (
        <div className="voice">
            <div className="voice-data">
                {isTranscript ? (
                    <div className="voice-notranscript">
                        <p className="voice-warn">There was no input from your end</p>
                        <button className="voice-try" onClick={() => resetMic()}>
                            Try Again ?
                        </button>
                    </div>
                ) : (
                    <React.Fragment>
                        {voiceError && <div className="voice-error">{voiceError}</div>}
                        {!voiceError && (
                            <div className="voice-transdata">
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
