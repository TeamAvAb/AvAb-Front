import React, { useEffect, useState } from "react";
import styled from "styled-components";

import LogoutP from "../../assets/mypage/LogoutImg.svg";
import WarnLogo from "../../assets/mypage/WarnLogo.svg";
import { privateAPI } from "../../apis/user";

export default function MyInfoBox({ content }) {
  const [isGoOutModalOpen, setGoOutModalOpen] = useState(false);
  const [nickname, setNickname] = useState("");

  localStorage.setItem("userimage", content.profileImage);

  const openGoOututModal = () => {
    setGoOutModalOpen(true);
  };

  const closeGoOutModal = () => {
    setGoOutModalOpen(false);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const ChangeName = async () => {
    const response = await privateAPI.patch(`/api/users/me`, {
      username: nickname,
    });
    if (response.status === 200) {
      // 요청이 성공하면 상태 업데이트
      console.log(response.data);
      setNickname(response.data.result.username);
      alert("저장되었습니다.");
    } else {
      // 요청이 실패하면 에러 처리
      console.log(response.data);
    }
  };

  useEffect(() => {
    setNickname(content.username);
  }, [content.username]);

  return (
    <MyInfo>
      <MyTitle>카카오 계정</MyTitle>
      <MyInput value={content.email} readOnly />
      <MyTitle2>닉네임</MyTitle2>
      <MyInput value={nickname} maxLength={10} onChange={handleNickname} />
      <WarnSpace>
        <WarnImg src={WarnLogo} />
        <Warn>닉네임은 공백포함 10자까지 작성 가능합니다.</Warn>
      </WarnSpace>
      <ButtonSection>
        <OutBut onClick={openGoOututModal}>회원탈퇴</OutBut>
        <SaveBut onClick={ChangeName}>저장하기</SaveBut>
      </ButtonSection>
      {isGoOutModalOpen && (
        <LogoutModal>
          <ModalContent>
            <ModalTitle>회원탈퇴 하시게요?</ModalTitle>
            <SemiTitle>한번 탈퇴하면 되돌릴 수 없습니다.</SemiTitle>
            <LogoutImg src={LogoutP} />
            <ModalBut>
              <LogoutButton onClick={closeGoOutModal}>회원탈퇴</LogoutButton>
              <CloseButton onClick={closeGoOutModal}>닫기</CloseButton>
            </ModalBut>
          </ModalContent>
        </LogoutModal>
      )}
    </MyInfo>
  );
}

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

const WarnSpace = styled.div`
  display: flex;
  margin-top: 10px;
`;

const WarnImg = styled.img`
  width: 16px;
  margin-left: 10px;
`;

const Warn = styled.div`
  color: #9fa4a9;
  margin-left: 10px;
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

//회원탈퇴 모달
const LogoutModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
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
