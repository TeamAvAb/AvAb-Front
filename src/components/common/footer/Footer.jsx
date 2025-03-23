import { useLocation } from 'react-router-dom';
import Footer1 from './Footer1';
import Footer3 from './Footer3';
import Footer2 from './Footer2';

export default function Footer() {
  const { pathname } = useLocation();
  
  if (pathname === '/' || pathname === '/search/list') {
    return <Footer1 />;
  } else if (
    pathname.startsWith('/flow/morewatchflow') ||
    pathname.startsWith('/recreation/detail')
  ) {
    return <Footer2 />;
  } else {
    return <Footer3 />;
  }
}
