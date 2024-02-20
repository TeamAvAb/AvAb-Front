import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Share from "../assets/moreflow/share.png";
import Time from "../assets/moreflow/time.png";
import User from "../assets/moreflow/user.png";
import View from "../assets/moreflow/view.png";
import Write from "../assets/moreflow/write.png";
import Scrap from "../assets/moreflow/scrap.png";
import Scrap2 from "../assets/moreflow/scrap2.png";
import Close from "../assets/myflow/close.png";
import RecreationInfo from "../components/recreationInfo/RecreationInfo";
import { privateAPI, publicAPI } from "../apis/user";

const PurposeList = {
  MT: "MT",
  GATHERING: "모임",
  WORKSHOP: "워크샵",
  RETREAT: "수련회",
  SPORTS_DAY: "체육대회",
};

const KeywordList = {
  COOPERATIVE: "협동",
  QUICKNESS: "순발력",
  SENSIBLE: "센스",
  BRAIN: "두뇌",
  CREATIVE: "창의력",
  ACTIVE: "액티브",
  PSYCHOLOGICAL: "심리",
  LUCK: "행운",
  COMMON_SENSE: "상식",
  PREPARATION: "준비물",
};

const GenderList = {
  MALE: "남성",
  FEMALE: "여성",
};

const AgeList = {
  UNDER_TEENAGER: "10대 미만",
  TEENAGER: "10대",
  TWENTIES: "20대",
  THIRTIES: "30대",
  FORTIES: "40대",
  OVER_FIFTIES: "50대 이상",
};

export default function MoreWatchFlow() {
  const [scrap, setScrap] = useState(false);
  // 스크랩 상태 변경
  const DoScrap = async (id) => {
    if (localStorage.getItem("accessToken")) {
      const response = await privateAPI.post(`/api/flows/${id}/scraps`);
      if (response.status === 200) {
        // 요청이 성공하면 상태 업데이트
        console.log(response.data);
        setScrap(true);
      } else {
        // 요청이 실패하면 에러 처리
        console.log(response.data);
      }
    } else alert("로그인이 필요한 기능입니다.");
  };

  // 삭제 버튼 모달창을 위한 상태
  const [share, setShare] = useState(false);
  const [modal, setModal] = useState(false);
  // 모달 창 열기 위한 상태 변화 함수
  const OpenModal = () => {
    setModal(true);
  };
  // 공유 버튼 누를 시 상태 변화 함수
  const ShareBtn = () => {
    setShare(true);
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        console.log("URL copied to clipboard");
      })
      .catch((err) => {
        console.error("Could not copy text: ", err);
      });
  };
  // 삭제 모달 창 닫기 위한 상태 변화 함수
  const close = () => {
    setModal(false);
    setShare(false);
  };

  // moreData 가져오기
  const [data, setData] = useState([]);
  const moreData = JSON.parse(localStorage.getItem("moreData"));
  const id = moreData.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.getItem("accessToken")) {
          const response = await privateAPI.get(`/api/flows/${id}`);
          setData(response.data.result);
        } else {
          const response = await publicAPI.get(`/api/flows/${id}`);
          setData(response.data.result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    setScrap(false);
  }, [id, scrap]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    data.length !== 0 && (
      <div style={{ backgroundColor: "#E9EBED" }}>
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
            src={data.flowDetail.imageUrl}
            alt="플로우사진"
            style={{ width: "250px", height: "250px", marginTop: "86px" }}
          />
          <TitleBox>
            <DetailTitleBox>
              <KeyWord>{PurposeList[data.flowDetail.purposeList[0]]}</KeyWord>
              <ScrapImg onClick={() => DoScrap(id)}>
                {data.flowDetail.isFavorite ? <img src={Scrap2} alt="스크랩O" /> : <img src={Scrap} alt="스크랩X" />}
              </ScrapImg>
            </DetailTitleBox>
            <FlowName>{data.flowDetail.title}</FlowName>

            {/* 플로우 세부사항 - 시간,조회수,작성자,사용자수 */}
            <FlowBoxDetailBox>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img src={Time} alt="시간" style={{ width: "38px", height: "38px" }} />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.flowDetail.totalPlayTime}</FlowBoxDetail>
              </FlowBoxDetails>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img src={View} alt="조회수" style={{ width: "38px", height: "38px" }} />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.flowDetail.viewCount}</FlowBoxDetail>
              </FlowBoxDetails>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img src={Write} alt="작성자" style={{ width: "35px", height: "35px" }} />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.flowDetail.author.username}</FlowBoxDetail>
              </FlowBoxDetails>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img src={User} alt="사용자수" style={{ width: "24px", height: "24px" }} />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.flowDetail.scrapCount}</FlowBoxDetail>
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
              <div style={{ width: "284px" }}>
                <div style={{ display: "flex", marginBottom: "8px" }}>
                  <FlowInfo style={{ width: "28px" }}>목적</FlowInfo>
                  <FlowInfo2 style={{ fontWeight: "400", maxWidth: "240px" }}>
                    {data.flowDetail.purposeList.map((p) => PurposeList[p]).join(", ")}
                  </FlowInfo2>
                </div>
                <div style={{ display: "flex" }}>
                  <FlowInfo>플레이 시간</FlowInfo>
                  <div>{data.flowDetail.totalPlayTime}분</div>
                </div>
              </div>

              <Line />

              <div style={{ marginLeft: "29px" }}>
                <div style={{ display: "flex", marginBottom: "8px" }}>
                  <FlowInfo>키워드</FlowInfo>
                  <FlowInfo2>
                    {data.flowDetail.keywordList.map((keyword) => (
                      <div>{KeywordList[keyword]}</div>
                    ))}
                  </FlowInfo2>
                </div>
                <div style={{ display: "flex", marginBottom: "8px" }}>
                  <FlowInfo>성별</FlowInfo>
                  <FlowInfo2>
                    {data.flowDetail.gender.map((gender) => (
                      <div>{GenderList[gender]}</div>
                    ))}
                  </FlowInfo2>
                </div>
                <div style={{ display: "flex", marginBottom: "8px" }}>
                  <FlowInfo>연령대</FlowInfo>
                  <FlowInfo2>
                    {data.flowDetail.age.map((age) => (
                      <div>{AgeList[age]}</div>
                    ))}
                  </FlowInfo2>
                </div>
                <div style={{ display: "flex", marginBottom: "8px" }}>
                  <FlowInfo>인원</FlowInfo>
                  <div>{data.flowDetail.participants}명</div>
                </div>
              </div>
            </FlowInfoDetail>

            <FlowContainer>
              <FlowTitle>플로우 제목</FlowTitle>

              {/* 레크레이션 박스 */}
              <RecreationBox>
                {data.recreations.map((recreation, i) => (
                  <RecreationInfo recreation={recreation} num={i} />
                ))}
              </RecreationBox>
            </FlowContainer>
          </FlowInfoBox>
        </FlowInfoContainer>
      </div>
    )
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
  background: rgba(70, 76, 82, 0.5);
  z-index: 999;
`;

const ModalBox = styled.div`
  width: 440px;
  height: 435px;
  border-radius: 20px;
  background: white;
  position: fixed;
  top: 215px;
  left: 50%;
  transform: translate(-50%);
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
  height: 403px;
  background-color: #8896df;
  display: flex;
  justify-content: center;
`;

const TitleBox = styled.div`
  width: 372px;
  height: 251px;
  gap: -24px;
  margin-top: 86px;
  margin-left: 251px;
  position: relative;
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
  margin-top: -28px;
`;

const FlowBoxDetails = styled.div`
  width: 100%;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
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
  box-sizing: border-box;
  width: 608px;
  height: 158px;
  border-radius: 20px;
  border: 1px solid #cacdd2;
  background: white;
  margin-bottom: 40px;
  padding: 29px 20px;
  display: flex;
  align-items: center;
  position: relative;
  flex: 1;
`;

const FlowInfo = styled.div`
  margin-right: 8px;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
`;

const FlowInfo2 = styled.div`
  display: flex;
  gap: 8px;
  max-width: 190px;
  flex-wrap: wrap;
`;

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 170px;
  margin-bottom: 131px;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: white;
`;

const Line = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  border: 0.5px solid #cacdd2;
  width: 0.5px;
  margin-top: 29px;
  margin-bottom: 29px;
`;

const FlowTitle = styled.div`
  margin-bottom: 59px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
`;

const RecreationBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  margin-bottom: 8px;
`;
