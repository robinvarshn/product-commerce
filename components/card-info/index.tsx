import '@styles/_cardInfo.scss';
import FadeInSection from 'components/fading';
import ModalComponent from 'components/modal';
import dynamic from 'next/dynamic';
import Image from 'next/legacy/image';
import React, { useState } from 'react';
import { CardInfoTypes } from './card-info';

const ObjectDetection = dynamic(() => import('components/object-detection'));
const VoiceAssistant = dynamic(() => import('components/voice-assistant'));

const CardInfo = ({
    cardText,
    cardSubText,
    cardIcon,
    cardType,
    type,
    modalData,
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
                                <Image
                                    src={`${cardIcon}`}
                                    alt={''}
                                    width={200}
                                    height={200}
                                />
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
                {type === 'voice' ? (
                    <VoiceAssistant {...modalData} />
                ) : (
                    <ObjectDetection {...modalData} />
                )}
            </ModalComponent>
        </React.Fragment>
    );
};

export default CardInfo;
