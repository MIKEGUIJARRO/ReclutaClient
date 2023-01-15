import React, { FC, ReactElement, useState } from 'react';
import { createPortal } from 'react-dom';

export interface GlobalModalContent {
  showModal(): void;
  hideModal(): void;
}
interface GlobalModal extends GlobalModalContent {
  isOpen: boolean;
  contentModal: ReactElement<GlobalModalContent> | null;
}

export const GlobalModal: FC<GlobalModal> = ({
  isOpen,
  contentModal,
  hideModal,
  showModal,
}) => {
  const modalRootEl = document.querySelector('#modal-root');

  const [isModalClosed, setIsModalClosed] = useState(false);

  const renderContentModal = () => {
    if (isModalClosed && !isOpen) {
      return null;
    } else if (React.isValidElement(contentModal)) {
      return React.cloneElement(contentModal, { hideModal, showModal });
    }
  };

  const transitionEndHandler = () => {
    if (!isOpen) {
      setTimeout(() => {
        setIsModalClosed(true);
      }, 200);
    } else {
      setIsModalClosed(false);
    }
  };

  if (modalRootEl) {
    return createPortal(
      <div className="">
        <div
          className={`modal cursor-pointer ${isOpen ? 'modal-open' : ''}`}
          onTransitionEnd={() => transitionEndHandler()}
          onClick={hideModal}
        >
          <div
            className="modal-box cursor-default"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div>{renderContentModal()}</div>
          </div>
        </div>
      </div>,
      modalRootEl
    );
  } else {
    return null;
  }
};
