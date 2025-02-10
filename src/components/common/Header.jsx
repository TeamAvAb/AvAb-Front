import { Link } from 'react-router-dom';
import styled from 'styled-components';
import lock from '../../assets/header/lock.svg';
import AvAb from '../../assets/header/AvAb.png';
import fallbackProfileImage from '../../assets/header/profileImg.png';
import useLoginStore from '../../stores/loginStore';
import useLoginModalStore from '../../stores/loginModalStore';
import Navigation from './Navigation';
import { scrollToTop } from '../../utils/windowUtils';
import Button from './button/Button';

export default function Header() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const { modalControl } = useLoginModalStore((state) => state);
  const getProfileImage = () => {
    const profileImage = localStorage.getItem('userImage');
    return profileImage === 'null' ? fallbackProfileImage : profileImage;
  };

  return (
    <HeaderContainer>
      <Link to="/">
        <LogoImg src={AvAb} onClick={scrollToTop} />
      </Link>
      <Navigation />
      {isLoggedIn ? (
        <Link to="/mypage/myinfo">
          <LogoutImg src={getProfileImage()} onClick={scrollToTop} />
        </Link>
      ) : (
        <>
          <LockImg src={lock} />
          <Button onClick={() => modalControl()}>로그인</Button>
        </>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  height: 4rem;
`;

const LogoImg = styled.img`
  width: 12.5rem;
  margin-right: 3.5rem;
  cursor: pointer;
`;

const LockImg = styled.img`
  width: 0.75rem;
  margin-left: 7.5rem;
  margin-right: -1.5rem;
`;

const LogoutImg = styled.img`
  width: 2.5rem;
  margin-left: 8rem;
  cursor: pointer;
`;
