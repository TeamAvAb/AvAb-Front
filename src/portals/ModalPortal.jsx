import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function ModalPortal({ children }) {
  const [el, setEl] = useState(null);

  useEffect(() => {
    let element = document.getElementById('modal');
    let created = false;

    if (!element) {
      element = document.createElement('div');
      element.id = 'modal';
      document.body.appendChild(element);
      created = true;
    }

    setEl(element);

    return () => {
      if (created && element) {
        document.body.removeChild(element);
      }
    };
  }, []);

  if (!el) return null;

  return ReactDOM.createPortal(children, el);
}
