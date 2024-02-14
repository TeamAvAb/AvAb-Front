import React, { useState } from "react";
import styled from "styled-components";
import none from "../assets/Footer/none.png";
import LeftButton from "../assets/myflow/moveLeft.png";
import RightButton from "../assets/myflow/moveRight.png";
import starIcon from "../assets/mypage/mingcute_star-fill.svg";
import YellowHeart from "../assets/mypage/YellowHeart.svg";
import GrayHeart from "../assets/mypage/GrayHeart.svg";
import { privateAPI } from "../apis/user";

export default function Mypage({ handleLogin }) {
  const [selectedMenu, setSelectedMenu] = useState("내 정보");
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isHeartFilled, setHeartFilled] = useState(false);

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const openLogoutModal = () => {
    setLogoutModalOpen(true);
  };

  const closeLogoutModal = () => {
    setLogoutModalOpen(false);
  };
  const handleLogout = async () => {
    try {
      const response = await privateAPI.delete("/api/auth/logout");
      localStorage.clear();
      console.log(response);
    } catch (error) {
      console.log("로그아웃 실패!");
    }
    handleLogin(false);
    setLogoutModalOpen(false);
  };

  const toggleHeart = () => {
    setHeartFilled(!isHeartFilled);
  };

  const recreationData = [
    {
      title: "레크레이션 제목 >",
      keywords: "키워드1, 키워드2, 키워드3",
      rate: "4.5",
      starSrc: starIcon,
      imgSrc: none,
      hashtag: "#해시태그",
    },
  ];

  return (
    <Container>
      <SideBar>
        <Title>마이페이지</Title>
        <MenuList>
          <MenuItem
            active={selectedMenu === "내 정보"}
            onClick={() => handleMenuClick("내 정보")}
          >
            내 정보
          </MenuItem>
          <MenuItem
            active={selectedMenu === "레크레이션"}
            onClick={() => handleMenuClick("레크레이션")}
          >
            즐겨 찾는 레크레이션
          </MenuItem>
          <MenuItem onClick={openLogoutModal}>로그아웃</MenuItem>
        </MenuList>
      </SideBar>
      <Content>
        {/*내 정보 페이지*/}
        {selectedMenu === "내 정보" && (
          <MyInfo>
            <MyTitle>카카오 계정</MyTitle>
            <MyInput placeholder="이메일" />
            <MyTitle2>닉네임</MyTitle2>
            <MyInput placeholder="닉네임" />
            <Warn>닉네임은 공백포함 10자까지 작성 가능합니다.</Warn>
            <ButtonSection>
              <OutBut>회원탈퇴</OutBut>
              <SaveBut>저장하기</SaveBut>
            </ButtonSection>
          </MyInfo>
        )}
        {/*즐겨 찾는 레크레이션 페이지*/}
        {selectedMenu === "레크레이션" && (
          <RecreationWrap>
            <RecreationTitle>레크레이션 찾기</RecreationTitle>
            <RecreationMain>
              {recreationData.map((recreation, index) =>
                Array.from({ length: 6 }).map((_, i) => (
                  <Categories key={`${index}-${i}`}>
                    <Hashtag>{recreation.hashtag}</Hashtag>
                    <RecreationExplain>
                      <ImgSpace>
                        <ExImg src={recreation.imgSrc} />
                        <HeartImg
                          src={isHeartFilled ? YellowHeart : GrayHeart}
                          onClick={toggleHeart}
                        />
                      </ImgSpace>
                      <Explain>
                        <Section1>{recreation.title}</Section1>
                        <SectionWrap>
                          <Section2>{recreation.keywords}</Section2>
                          <Section3 src={recreation.starSrc} />
                          <Section4>{recreation.rate}</Section4>
                        </SectionWrap>
                      </Explain>
                    </RecreationExplain>
                  </Categories>
                ))
              )}
            </RecreationMain>
            {/*페이지 전환*/}
            <NextPage>
              <ImageBox>
                <ButtonImage src={LeftButton} alt="왼쪽 버튼" />
              </ImageBox>
              <PageNumber
                style={{
                  marginLeft: "14px",
                  backgroundColor: "#8896DF",
                  borderRadius: "50%",
                  color: "white",
                }}
              >
                1
              </PageNumber>
              <PageNumber>2</PageNumber>
              <PageNumber>3</PageNumber>
              <PageNumber>4</PageNumber>
              <PageNumber>5</PageNumber>
              <PageNumber>6</PageNumber>
              <PageNumber>7</PageNumber>
              <PageNumber style={{ marginRight: "14px" }}>8</PageNumber>
              <ImageBox>
                <ButtonImage src={RightButton} alt="오른쪽 버튼" />
              </ImageBox>
            </NextPage>
          </RecreationWrap>
        )}
      </Content>
      {/*우측 바*/}
      <RightSide />
      {/*로그아웃 모달*/}
      {isLogoutModalOpen && (
        <LogoutModal>
          <ModalContent>
            <ModalTitle>로그아웃 하시게요?</ModalTitle>
            <SemiTitle>더 많은 혜택이 기다리고 있어요.</SemiTitle>
            <LogoutImg src={none} />
            <ModalBut>
              <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
              <CloseButton onClick={closeLogoutModal}>닫기</CloseButton>
            </ModalBut>
          </ModalContent>
        </LogoutModal>
      )}
    </Container>
  );
}

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
  display: flex;
  flex: 1;
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
  margin-top: 20px;
`;

const MyTitle2 = styled(MyTitle)`
  margin-top: 60px;
`;

const MyInput = styled.input`
  width: 657px;
  height: 70px;
  border-radius: 20px;
  border: solid #cacdd2 1px;
  color: #cacdd2;
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 284px;
  height: 197px;
`;

const ExImg = styled.img`
  width: 120px;
  width: 120px;
  margin-top: 20px;
`;

const HeartImg = styled.img`
  width: 28px;
  margin-left: 200px;
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

  &:hover {
    background-color: #a0ddff;
  }
`;

const SectionWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Section1 = styled.div`
  font-size: 17px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Section2 = styled.div`
  font-size: 15px;
`;

const Section3 = styled.img`
  margin-left: 30px;
  width: 13.72px;
`;

const Section4 = styled.div`
  margin-left: 5px;
`;

const NextPage = styled.div`
  display: flex;
  margin-top: 52px;
  margin-bottom: 30px;
  height: 42px;
`;

const PageNumber = styled.div`
  font-size: 20px;
  font-weight: bold;
  width: 42px;
  height: 42px;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 42px;
  height: 42px;
`;

const ButtonImage = styled.img`
  width: 100%;
  height: 100%;
  filter: drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15));
  cursor: pointer;
`;

const RightSide = styled.div`
  width: 5.7325%;
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
