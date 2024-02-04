import React, { useState } from "react";
import styled from "styled-components";
import Blank from "../assets/moreflow/blank.png";
import Share from "../assets/moreflow/share.png";
import Time from "../assets/moreflow/time.png";
import User from "../assets/moreflow/user.png";
import View from "../assets/moreflow/view.png";
import Scrap from "../assets/moreflow/scrap.png";
import Scrap2 from "../assets/moreflow/scrap2.png";
import Close from "../assets/myflow/close.png";
import RecreationInfo from "../components/recreationInfo/RecreationInfo";

export default function MoreMyFlow() {
  // scrap 상태
  const [scrap, setScrap] = useState(false);
  const ScrapFunc = () => {
    scrap ? setScrap(false) : setScrap(true);
  };

  // 삭제 버튼 모달창을 위한 상태
  const [share, setShare] = useState(false);
  const [modal, setModal] = useState(false);
  // 모달 창 열기 위한 상태 변화 함수
  const OpenModal = () => {
    setModal(true);
  };
  // 삭제 버튼 누를 시 상태 변화 함수
  const ShareBtn = () => {
    setShare(true);
  };
  // 삭제 모달 창 닫기 위한 상태 변화 함수
  const close = () => {
    setModal(false);
    setShare(false);
  };

  return (
    <div style={{ width: "1536px", backgroundColor: "#E9EBED" }}>
      {/* 모달창 */}
      {modal ? (
        <ModalContainer>
          <ModalBox>
            <CloseBtn onClick={close}>
              <img src={Close} alt="닫기" />
            </CloseBtn>
            <ModalBoxDetail>
              <div>
                <ModalTitle>
                  일정 플로우를
                  <br />
                  공유하세요!
                </ModalTitle>
              </div>
              {share ? (
                <AfterCopyBtn>복사 완료</AfterCopyBtn>
              ) : (
                <BeforeCopyBtn onClick={ShareBtn}>링크 복사하기</BeforeCopyBtn>
              )}
            </ModalBoxDetail>
          </ModalBox>
        </ModalContainer>
      ) : (
        <></>
      )}

      <TitleContainer>
        <img
          src={Blank}
          alt="플로우사진"
          style={{ width: "250px", height: "250px", marginLeft: "227px", marginTop: "86px" }}
        />
        <TitleBox>
          <DetailTitleBox>
            <KeyWord>신년회</KeyWord>
            <ScrapImg onClick={ScrapFunc}>
              {scrap ? <img src={Scrap2} alt="스크랩" /> : <img src={Scrap} alt="스크랩" />}
            </ScrapImg>
          </DetailTitleBox>
          <FlowName>플로우 이름</FlowName>

          {/* 플로우 세부사항 - 시간,조회수,작성자,사용자수 */}
          <FlowBoxDetailBox>
            <FlowBoxDetails>
              <FlowBoxDetailImg>
                <img src={Time} alt="시간" style={{ width: "38px", height: "38px" }} />
              </FlowBoxDetailImg>
              <FlowBoxDetail>70분</FlowBoxDetail>
            </FlowBoxDetails>
            <FlowBoxDetails>
              <FlowBoxDetailImg>
                <img src={View} alt="조회수" style={{ width: "38px", height: "38px" }} />
              </FlowBoxDetailImg>
              <FlowBoxDetail>2,232</FlowBoxDetail>
            </FlowBoxDetails>
            <FlowBoxDetails>
              <FlowBoxDetailImg>
                <img src={User} alt="사용자수" style={{ width: "24px", height: "24px" }} />
              </FlowBoxDetailImg>
              <FlowBoxDetail>2,232</FlowBoxDetail>
            </FlowBoxDetails>
          </FlowBoxDetailBox>

          {/* 공유버튼 */}
          <ShareImg onClick={OpenModal}>
            <img src={Share} alt="공유하기" />
          </ShareImg>
        </TitleBox>
      </TitleContainer>

      <FlowInfoContainer>
        <FlowInfoBox>
          <FlowInfoTitle>
            <div>기본정보</div>
            <div>세부정보</div>
          </FlowInfoTitle>

          <FlowInfoDetail>
            <div style={{ marginLeft: "20px", marginTop: "56px" }}>
              <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>목적</div>
                <div>회사 워크샵</div>
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>
                  플레이 시간
                </div>
                <div>90분</div>
              </div>
            </div>

            <Line></Line>

            <div style={{ marginTop: "29px" }}>
              <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>
                  키워드
                </div>
                <div style={{ marginRight: "8px" }}>키워드 1</div>
                <div style={{ marginRight: "8px" }}>키워드 2</div>
                <div>키워드 3</div>
              </div>
              <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>성별</div>
                <div>여성, 남성</div>
              </div>
              <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>
                  연령대
                </div>
                <div>30대, 40대</div>
              </div>
              <div style={{ display: "flex", marginBottom: "8px" }}>
                <div style={{ marginRight: "8px", fontSize: "16px", fontStyle: "normal", fontWeight: "600" }}>인원</div>
                <div>40명</div>
              </div>
            </div>
          </FlowInfoDetail>

          <FlowContainer>
            <div style={{ width: "393px", textAlign: "center" }}>
              <FlowTitle>플로우 제목</FlowTitle>
            </div>

            {/* 레크레이션 박스 */}
            <RecreationInfo time={10} num={1} />
            <RecreationInfo time={20} num={2} />
            <RecreationInfo time={10} num={3} />
            <RecreationInfo time={40} num={4} />
            <RecreationInfo time={30} num={5} />
          </FlowContainer>

          {/* 삭제 수정 버튼 */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "80px", marginBottom: "131px" }}>
            <Delete>삭제</Delete>
            <Change>수정</Change>
          </div>
        </FlowInfoBox>
      </FlowInfoContainer>
    </div>
  );
}

// 모달창
const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(70, 76, 82, 0.5);
  z-index: 3;
`;

const ModalBox = styled.div`
  width: 440px;
  height: 435px;
  border-radius: 20px;
  background: white;
  position: fixed;
  top: 215px;
  left: 548px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBoxDetail = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
`;

const CloseBtn = styled.div`
  width: 42px;
  height: 42px;
  position: absolute;
  top: 20px;
  left: 378px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ModalTitle = styled.div`
  font-size: 36px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
`;

const BeforeCopyBtn = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 223px;
  padding: 15px 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  background: #4036ed;
  color: white;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  cursor: pointer;
`;

const AfterCopyBtn = styled.div`
  display: flex;
  box-sizing: border-box;
  height: 54px;
  width: 223px;
  padding: 15px 34px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid #4036ed;
  background: white;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  color: #4036ed;
  text-align: center;
`;

const TitleContainer = styled.div`
  width: 1536px;
  height: 403px;
  background-color: #8896df;
  display: flex;
`;

const TitleBox = styled.div`
  width: 372px;
  height: 251px;
  gap: -24px;
  position: absolute;
  left: 778px;
  margin-top: 86px;
`;

const DetailTitleBox = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
`;

const KeyWord = styled.div`
  padding: 16px 34px;
  gap: 10px;
  border-radius: 50px;
  background: #a0ddff;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  text-align: center;
  color: #1b1d1f;
`;

const ScrapImg = styled.div`
  width: 42px;
  height: 42px;
  position: absolute;
  left: 330px;
  cursor: pointer;
`;

const FlowName = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  color: #1b1d1f;
  margin-top: 22px;
`;

const FlowBoxDetailBox = styled.div`
  margin-left: 279px;
  margin-top: 14px;
`;

const FlowBoxDetails = styled.div`
  width: 93px;
  height: 42px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FlowBoxDetail = styled.div`
  width: 93px;
  height: 42px;
  font-size: 16px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const FlowBoxDetailImg = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: right;
  align-items: center;
`;

const ShareImg = styled.div`
  width: 42px;
  height: 42px;
  margin-top: -55px;
  cursor: pointer;
`;

const FlowInfoContainer = styled.div`
  height: 100%;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  width: 1536px;
`;

const FlowInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FlowInfoTitle = styled.div`
  width: 608px;
  height: 83px;
  border-radius: 20px;
  border: 1px solid #cacdd2;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 13px;
  gap: 225px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const FlowInfoDetail = styled.div`
  width: 608px;
  height: 158px;
  border-radius: 20px;
  border: 1px solid #cacdd2;
  background: white;
  margin-bottom: 40px;
  display: flex;
`;

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 170px;
  margin-bottom: 40px;
  align-items: flex-start;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: white;
`;

const Line = styled.div`
  border: 0.5px solid #cacdd2;
  width: 0.5px;
  height: 100px;
  margin-top: 29px;
  margin-left: 169px;
  margin-right: 20px;
`;

const FlowTitle = styled.div`
  margin-bottom: 59px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const Delete = styled.div`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid #9fa4a9;
  background: white;
  color: #9fa4a9;
  cursor: pointer;
`;

const Change = styled.div`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  border: 1px solid #9fa4a9;
  background: #1b1d1f;
  color: white;
  cursor: pointer;
`;
