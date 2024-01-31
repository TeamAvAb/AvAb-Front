import React, { useState } from 'react';
import styled from 'styled-components';
import none from '../assets/Footer/none.png'

export default function Mypage () {
  const [selectedMenu, setSelectedMenu] = useState('내 정보');
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };
  
  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };

  const recreationData = [
    {
      title: '레크레이션 제목 >',
      keywords: '키워드1, 키워드2, 키워드3',
      imgSrc: none,
      hashtag: '#해시태그'
    }
  ]

  return (
    <Container>
      <SideBar>
        <Title>마이페이지</Title>
        <MenuList>
          <MenuItem active={selectedMenu === '내 정보'} onClick={() => handleMenuClick('내 정보')}>
            내 정보
          </MenuItem>
          <MenuItem active={selectedMenu === '레크레이션'} onClick={() => handleMenuClick('레크레이션')}>
            즐겨 찾는 레크레이션
          </MenuItem>
          <MenuItem onClick={openLogoutModal}>
            로그아웃
          </MenuItem>
        </MenuList>
      </SideBar>
      <Content>
        {selectedMenu === '내 정보' && 
          <MyInfo>
            <MyTitle>카카오 계정</MyTitle>
            <MyInput placeholder='이메일'/>
            <MyTitle2>닉네임</MyTitle2>
            <MyInput placeholder='닉네임'/>
            <Warn>닉네임은 공백포함 10자까지 작성 가능합니다.</Warn>
            <ButtonSection>
              <OutBut>회원탈퇴</OutBut>
              <SaveBut>저장하기</SaveBut>
            </ButtonSection>
          </MyInfo>}
        {selectedMenu === '레크레이션' && 
        <RecreationWrap>
          <RecreationTitle>레크레이션 찾기</RecreationTitle>
          <RecreationMain>
            {recreationData.map((recreation, index) => 
              Array.from({length: 6}).map((_, i) => 
                <Categories key={`${index}-${i}`}>
                  <Hashtag>{recreation.hashtag}</Hashtag>
                  <RecreationExplain>
                    <ImgSpace>
                      <ExImg src={recreation.imgSrc}></ExImg>
                    </ImgSpace>
                    <Explain>
                      <Section1>{recreation.title}</Section1>
                      <Section2>{recreation.keywords}</Section2>
                    </Explain>
                  </RecreationExplain>
                </Categories>
              )
            )}
          </RecreationMain>
          <NextPage>페이지 전환</NextPage>
        </RecreationWrap>
        }
      </Content>
      <RightSide/>
      {isLogoutModalOpen && (
        <LogoutModal>
          <ModalContent>
            <ModalTitle>로그아웃 하시게요?</ModalTitle>
            <SemiTitle>더 많은 혜택이 기다리고 있어요.</SemiTitle>
            <LogoutImg src={none}/>
            <ModalBut>
              <LogoutButton onClick={closeLogoutModal}>로그아웃</LogoutButton>
              <CloseButton onClick={closeLogoutModal}>닫기</CloseButton>
            </ModalBut>
          </ModalContent>
        </LogoutModal>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;

const Title = styled.div`
  width: 260px;
  padding: 30px;
  font-size: 22px;
`;

const SideBar = styled.div`
  width: 320px;
  height: 714px;
  box-sizing: border-box;
  font-size: 22px;
  border: solid #cacdd2 1px;
  border-bottom: none;
  border-right: none;
  color: #1b1d1f;
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: solid #cacdd2 1px;
  border-left: none;
  border-right: none;
`;

const MenuItem = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 20px;
  width: 280px;
  border-bottom: solid #cacdd2 1px;

  ${(props) =>
    props.active &&
    `
    background-color: #b1beff;
    font-weight: 600;
  `}
`;

const Content = styled.div`
    width: 1128px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: solid #cacdd2 1px;
    border-bottom: none;
`;

const MyInfo = styled.div`
  width: 687px;
  height: 434px;
`;

const MyTitle = styled.div`
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top:20px;
`;

const MyTitle2 = styled(MyTitle)`
  margin-top: 60px;
`;

const MyInput = styled.input`
  width: 657px;
  height: 70px;
  border-radius: 20px;
  border: solid #cacdd2 1px;
  font-color: #cacdd2;
  font-size: 20px;
  padding-left: 25px;
`;

const Warn = styled.div`
  margin-top: 10px;
  color: #9fa4a9;
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 20px;
`;

const OutBut = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  border-radius: 30px;
  color: white;
  width: 150px;
  height: 50px;
  cursor: pointer;
`;

const SaveBut = styled(OutBut)`
  background-color: #19297c;
`;

const RecreationWrap = styled.div`
  width: 1128px;
  height: 1203px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const RecreationTitle = styled.div`
  font-size: 40px;
  font-weight: 600;
  margin-bottom: 70px;
`;

const RecreationMain = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
  align-items: center;
`;

const Categories = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Hashtag = styled.div`
  font-size: 20px;
  border-radius: 30px;
  background-color: #5b6bbe;
  color: white;
  width: 151px;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecreationExplain = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 284px;
  height: 309px;
  margin-top: 20px;
  border-radius: 15px;
  box-shadow: 1px 1px 8px #abaaae inset;
  margin-bottom: 20px;
`;

const ImgSpace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 284px;
  height: 197px;
`;

const ExImg = styled.img`
  width: 120px;
  width: 120px;
`;

const Explain = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #b1beff;
  width: 284px;
  height: 112px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
`;

const Section1 = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px
`

const Section2 = styled.div`
  font-size: 13px;
`;

const NextPage = styled.div`
  display: flex;
  justify-content: center;
  width: 450px;
  margin-top: 40px;
  padding-top: 9px;
  padding-bottom: 9px;
  border: solid black;
`;

const RightSide = styled.div`
    width: 88px;
    background-color: #f7f8f9;
`;

const LogoutModal = styled.div`
  position: fixed;
  top: 0;
  width: 1536px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background-color: #f7f8f9;
  width: 400px;
  height: 395px;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 230px;
  margin-right: 80px;
`;

const ModalTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
`;

const SemiTitle = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-top: 10px;
`;

const LogoutImg = styled.img`
  width: 200px;
  height: 210px;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const ModalBut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 20px;
  border-top: solid gray 1px;
  width: 440px;
`;

const LogoutButton = styled.div`
  display: flex;
  justify-content: center;
  border: solid black 1px;
  padding: 12px 10px;
  border-radius: 30px;
  width: 110px;
  font-weight: 600;
  cursor: pointer;
`;

const CloseButton = styled(LogoutButton)`
  background-color: #4036ed;
  color: white;
  border: none;
  margin-left: 80px;
`;