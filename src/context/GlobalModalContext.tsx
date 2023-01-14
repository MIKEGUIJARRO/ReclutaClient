import { FC, createContext, ReactNode, useState, ReactElement } from 'react';
import { GlobalModal, GlobalModalContent } from '../components/ui/GlobalModal';

interface GlobalModalContext {
  showModal: () => void;
  hideModal: () => void;
  loadContent: (content: ReactElement<GlobalModalContent>) => void;
  initModal: (content: ReactElement<GlobalModalContent>) => void;
}

const initialState: GlobalModalContext = {
  showModal: () => {},
  hideModal: () => {},
  loadContent: () => {},
  initModal: () => {},
};

export const GlobalModalContext =
  createContext<GlobalModalContext>(initialState);

interface Props {
  children: ReactNode;
}

export const GlobalModalProvider: FC<Props> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] =
    useState<ReactElement<GlobalModalContent> | null>(null);

  const loadContent = (content: ReactElement<GlobalModalContent>): void => {
    setContent(content);
  };

  const showModal = (): void => {
    setIsOpen(true);
  };

  const hideModal = (): void => {
    setIsOpen(false);
  };

  const initModal = (content: ReactElement<GlobalModalContent>): void => {
    loadContent(content);
    showModal();
  };

  const renderModal = () => {
    return (
      <GlobalModal
        isOpen={isOpen}
        contentModal={content}
        hideModal={hideModal}
        showModal={showModal}
      />
    );
  };

  return (
    <GlobalModalContext.Provider
      value={{ showModal, hideModal, loadContent, initModal }}
    >
      {renderModal()}
      {children}
    </GlobalModalContext.Provider>
  );
};
