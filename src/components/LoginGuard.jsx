import useLoginStore from '../stores/loginStore';
import { Navigate, Outlet } from 'react-router-dom';

export default function LoginGuard() {
  const { isLoggedIn } = useLoginStore();

  return isLoggedIn ? <Outlet /> : <Navigate to="/" replace />;
}
