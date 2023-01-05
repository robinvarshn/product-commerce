import Image from 'next/legacy/image';
import React, { useState } from 'react';
import '@styles/_cardInfo.scss';
import { CardInfoTypes } from './card-info.types';
import FadeInSection from 'components/fading';
import ModalComponent from 'components/modal';
import VoiceAssistant from 'components/voice-assistant';
import ObjectDetection from 'components/object-detection';

const CardInfo = ({
    cardText,
    cardSubText,
    cardIcon,
    cardType,
    type,
}: CardInfoTypes): JSX.Element => {
    const [isModalOpen, setModal] = useState<boolean>(false);
    return (
        <React.Fragment>
            <FadeInSection type={cardType}>
                <div
                    className={`card card-${cardType}`}
                    role="button"
                    onClick={() => setModal(true)}
                >
                    <div className="card-info">
                        <div className="card-info__icon">
                            {cardIcon && (
                                <Image src={`${cardIcon}`} alt={''} width={200} height={200} />
                            )}
                        </div>
                        <div className="card-info__text">
                            <p className="card-info__header">{cardText}</p>
                        </div>
                    </div>
                    {cardSubText && <p className="card-subInfo">{cardSubText}</p>}
                </div>
            </FadeInSection>
            <ModalComponent isOpen={isModalOpen} setModal={setModal}>
                {type === 'voice' ? <VoiceAssistant /> : <ObjectDetection />}
            </ModalComponent>
        </React.Fragment>
    );
};

export default CardInfo;
