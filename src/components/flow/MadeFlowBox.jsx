import React, { useState } from "react";
import styled from "styled-components";
import Time from "../../assets/myflow/time.png";
import View from "../../assets/myflow/view.png";
import User from "../../assets/myflow/user.png";
import Blank from "../../assets/myflow/blank.png";
import Close from "../../assets/myflow/close.png";
import { useNavigate } from "react-router-dom";

export default function MadeFlowBox({ datas, loading }) {
  // 삭제 버튼 모달창을 위한 상태
  const [del, setDel] = useState(false);
  // 삭제 버튼 누를 시 상태 변화 함수
  const deleteBtn = () => {
    setDel(true);
  };
  // 삭제 모달 창 닫기 위한 상태 변화 함수
  const close = () => {
    setDel(false);
  };

  //더보기 이동
  const navigate = useNavigate();
  const moveToMoreMyFlow = (moreData) => {
    navigate(`/flow/moremyflow`, { state: { moreData } });
  };

  console.log(datas);

  return (
    <div>
      {/* 모달창 */}
      {del ? (
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
                  삭제하시겠습니까?
                </ModalTitle>
                <ModalDetail>삭제한 플로우를 다시 복구할 수 없습니다.</ModalDetail>
              </div>
              <ModalStoreBtn>저장하기</ModalStoreBtn>
              <ModalNotStoreBtn>저장하지 않기</ModalNotStoreBtn>
            </ModalBoxDetail>
          </ModalBox>
        </ModalContainer>
      ) : (
        <></>
      )}

      <MyFlowBoxParent>
        {datas.map((data) => (
          <MyFlowBoxChild>
            {/* 수정/삭제 버튼 */}
            <FlowBoxCorDelBox>
              <FlowBoxCor>수정</FlowBoxCor>
              <FlowBoxDel onClick={deleteBtn}>삭제</FlowBoxDel>
            </FlowBoxCorDelBox>

            {/* 키워드 */}
            <FlowBoxKeyWord>{data.purpose.map((p) => p).join(", ")}</FlowBoxKeyWord>

            {/* 플로우 이름 */}
            <FlowBoxTitle>{data.title}</FlowBoxTitle>

            {/* 플로우 사진 */}
            <FlowBoxImg src={Blank} alt="플로우 사진" />

            {/* 플로우 세부사항 - 시간,조회수,작성자,사용자수 */}
            <FlowBoxDetailBox>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img src={Time} alt="시간" style={{ width: "38px", height: "38px" }} />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.totalPlayTime}</FlowBoxDetail>
              </FlowBoxDetails>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img src={View} alt="조회수" style={{ width: "38px", height: "38px" }} />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.viewCount}</FlowBoxDetail>
              </FlowBoxDetails>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img src={User} alt="스크랩수" style={{ width: "24px", height: "24px" }} />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.scrapCount}</FlowBoxDetail>
              </FlowBoxDetails>
            </FlowBoxDetailBox>
            <MoreBtn onClick={() => moveToMoreMyFlow(data)}>자세히 보기</MoreBtn>
          </MyFlowBoxChild>
        ))}
      </MyFlowBoxParent>
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
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 440px;
  height: 435px;
  border-radius: 20px;
  background: white;
  position: relative;
`;

const ModalBoxDetail = styled.div`
  margin-left: 57.5px;
  margin-top: 55px;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
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

const ModalDetail = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  text-align: center;
`;

const ModalStoreBtn = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  background-color: #4036ed;
  color: white;
  width: 223px;
  padding: 15px 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  margin-top: 60px;
  cursor: pointer;
`;

const ModalNotStoreBtn = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  background-color: white;
  color: #464c52;
  width: 223px;
  padding: 15px 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #464c52;
  border-radius: 50px;
  margin-top: 40px;
  cursor: pointer;
`;

// 플로우 박스 - Grid
const MyFlowBoxParent = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 370px);
  row-gap: 20px;
  column-gap: 120px;
`;

const MyFlowBoxChild = styled.div`
  width: 368px;
  height: 408px;
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.15);
  position: relative;
`;

const FlowBoxKeyWord = styled.div`
  background-color: #a0ddff;
  border-radius: 45px;
  position: absolute;
  color: #1b1d1f;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  padding: 16px 34px;
  margin-top: 37px;
  margin-left: 36px;
`;

const FlowBoxTitle = styled.div`
  margin-top: 116px;
  margin-left: 36px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const FlowBoxCorDelBox = styled.div`
  width: 75px;
  height: 90px;
  position: absolute;
  margin-left: 272px;
  margin-top: 40px;
`;

const FlowBoxCor = styled.div`
  background-color: black;
  color: white;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  border-radius: 50px;
  padding: 8px 20px;
  margin-bottom: 10px;
  cursor: pointer;
`;

const FlowBoxDel = styled.div`
  background-color: white;
  color: #9fa4a9;
  font-size: 19px;
  font-style: normal;
  font-weight: 700;
  border-radius: 50px;
  padding: 8px 20px;
  border: 1px solid #9fa4a9;
  cursor: pointer;
`;

const FlowBoxImg = styled.img`
  margin-top: 23px;
  margin-left: 36px;
  width: 142px;
  height: 142px;
`;

const FlowBoxDetailBox = styled.div`
  margin-top: -132px;
  margin-left: 239px;
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

const MoreBtn = styled.div`
  background-color: #b1beff;
  width: 370px;
  height: 76px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 333px;
  border-radius: 0px 0px 20px 20px;

  &:hover {
    background-color: #a0ddff;
    transition: 0.2s;
  }
`;
