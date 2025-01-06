import { useState } from 'react';
import ModalWrapper from '../components/modal/ModalWrapper';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    ModalWrapper: ({ children }) =>
      isModalOpen ? <ModalWrapper close={closeModal} children={children} /> : null,
    openModal,
    closeModal,
  };
};
export default useModal;
