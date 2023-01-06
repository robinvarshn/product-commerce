import '@styles/_modal.scss';
import React from 'react';
import Modal from 'react-modal';
import { ModalTypes } from './modal';

const ModalComponent = ({ children, isOpen, setModal }: ModalTypes): JSX.Element => {
    const closeModal = (): void => {
        setModal((prevState) => !prevState);
    };

    return (
        <React.Fragment>
            <Modal
                ariaHideApp={false}
                className="modal"
                overlayClassName="overlay"
                isOpen={isOpen}
                onRequestClose={closeModal}
            >
                <button className="modal-close" onClick={() => closeModal()}></button>
                <div className="modal-content">{children}</div>
            </Modal>
        </React.Fragment>
    );
};

export default ModalComponent;
