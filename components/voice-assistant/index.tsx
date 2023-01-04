import React, { useEffect } from 'react';
import 'regenerator-runtime/runtime';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const VoiceAssistant = (): JSX.Element => {
    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, isMicrophoneAvailable } =
        useSpeechRecognition();
    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    useEffect(() => {
        if (isMicrophoneAvailable) {
            SpeechRecognition.startListening();
        } else {
            console.log('not');
        }
    }, [isMicrophoneAvailable]);

    return (
        <div>
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            {/* <button onClick={}>Start</button> */}
            <button onClick={SpeechRecognition.stopListening}>Stop</button>
            <button onClick={resetTranscript}>Reset</button>
            <p>{transcript}</p>
        </div>
    );
};

export default VoiceAssistant;
