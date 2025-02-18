import ModalPortal from '../../portals/ModalPortal';
import { useEffect } from 'react';
import { Backdrop } from './modal.style';

const ModalWrapper = ({ children, close }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [close]);

  return (
    <ModalPortal children={children}>
      <Backdrop
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {children}
      </Backdrop>
    </ModalPortal>
  );
};
export default ModalWrapper;
