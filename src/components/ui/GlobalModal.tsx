import React, { FC, ReactElement } from 'react';
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

  const renderContentModal = () => {
    if (React.isValidElement(contentModal)) {
      return React.cloneElement(contentModal, { hideModal, showModal });
    }
  };
  if (modalRootEl) {
    return createPortal(
      <div className="">
        <div
          className={`modal cursor-pointer ${isOpen ? 'modal-open' : ''}`}
          onClick={() => hideModal()}
        >
          <div
            className="modal-box cursor-default"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {renderContentModal()}
          </div>
        </div>
      </div>,
      modalRootEl
    );
  } else {
    return null;
  }
};
