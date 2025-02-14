import ModalPortal from '../../portals/ModalPortal';
import { useEffect } from 'react';
import styled from 'styled-components';

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

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  background: var(--shadow, rgba(70, 76, 82, 0.5));
  z-index: 999;
`;
