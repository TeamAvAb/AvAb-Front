import React, { useState } from "react";
import styled from "styled-components";
import x from "../../assets/main/closeIcon.svg";
import * as S from "./modal.style";
import LogoutP from "../../assets/mypage/LogoutImg.svg";
import patchUserDelete from "../../apis/patchUserDelete";
import useLoginStore from "../../stores/loginStore";
import { useNavigate } from "react-router";

export default function WithdrawModal({ handleModal }) {
  const [withdrawComplete, setWithdrawComplete] = useState(false);
  const { logout } = useLoginStore();
  const navigator = useNavigate();
  const completeWithdraw = () => {
    logout();
    navigator("/");
  };

  const apiCall = () => {
    if (patchUserDelete()) {
      setWithdrawComplete(true);
    } else {
      console.log("patchUserDelete Fail");
    }
  };
  return (
    <Container>
      <S.Modal>
        <S.Content className="hasimage">
          {withdrawComplete ? (
            <>
              <S.TitleContainer>
                <S.Title>탈퇴되었습니다</S.Title>
                <S.SubTitle>
                  계정 정보는 한달 동안 유효하니 다시 찾아주세요!
                </S.SubTitle>
              </S.TitleContainer>
              <LogoutImg src={LogoutP} />
              <S.BtnContainer>
                <S.BtnF onClick={completeWithdraw}>닫기</S.BtnF>
              </S.BtnContainer>
              <S.CloseBtn onClick={completeWithdraw} src={x} />
            </>
          ) : (
            <>
              <S.TitleContainer>
                <S.Title>회원탈퇴 하시게요?</S.Title>
                <S.SubTitle>
                  30일 이후에는 계정 및 데이터가 영구 삭제되며 복구가
                  불가능합니다.
                </S.SubTitle>
              </S.TitleContainer>
              <LogoutImg src={LogoutP} />
              <S.BtnContainer className="btn-row">
                <S.BtnB onClick={apiCall} className="btn-row">
                  회원탈퇴
                </S.BtnB>
                <S.BtnF onClick={() => handleModal(false)} className="btn-row">
                  닫기
                </S.BtnF>
              </S.BtnContainer>
              <S.CloseBtn onClick={() => handleModal(false)} src={x} />
            </>
          )}
        </S.Content>
      </S.Modal>
    </Container>
  );
}

const Container = styled.div`
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
const LogoutImg = styled.img`
  width: 200px;
  height: 210px;
  margin-bottom: 20px;
`;
