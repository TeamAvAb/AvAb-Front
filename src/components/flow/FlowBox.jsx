import React from "react";
import { privateAPI } from "../../apis/user";
import styled from "styled-components";
import Scrap from "../../assets/watchflow/scrap.png";
import Scrap2 from "../../assets/watchflow/scrap2.png";
import Time from "../../assets/watchflow/time.png";
import View from "../../assets/watchflow/view.png";
import Write from "../../assets/watchflow/write.png";
import User from "../../assets/watchflow/user.png";
import { useNavigate } from "react-router-dom";
import useLoginModalStore from "../../stores/loginModalStore";

const PurposeList = {
  MT: "MT",
  GATHERING: "모임",
  WORKSHOP: "워크샵",
  RETREAT: "수련회",
  SPORTS_DAY: "체육대회",
};

export default function FlowBox({ datas, setScrap }) {
  const { modalControl } = useLoginModalStore();

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
    } else modalControl();
  };

  // 더보기 이동
  const navigate = useNavigate();

  const moveToMoreWatchFlow = (moreData) => {
    localStorage.setItem("moreData", JSON.stringify(moreData));
    navigate(`/flow/morewatchflow/${moreData.title}`);
  };

  return (
    <div>
      <MyFlowBoxParent>
        {datas.map((data, i) => (
          <MyFlowBoxChild key={i}>
            {/* 키워드 */}
            <FlowBoxKeyWord>{PurposeList[data.purpose[0]]}</FlowBoxKeyWord>

            {/* 스크랩 버튼 */}
            <FlowBoxScrapBox>
              {data.isScraped ? (
                <FlowBoxScrapImg
                  src={Scrap2}
                  alt="스크랩O"
                  onClick={() => DoScrap(data.id)}
                />
              ) : (
                <FlowBoxScrapImg
                  src={Scrap}
                  alt="스크랩X"
                  onClick={() => DoScrap(data.id)}
                />
              )}
            </FlowBoxScrapBox>

            {/* 플로우 이름 */}
            <FlowBoxTitle>{data.title}</FlowBoxTitle>

            {/* 플로우 사진 */}
            <FlowBoxImg src={data.imageUrl} alt="플로우 사진" />

            {/* 플로우 세부사항 - 시간,조회수,작성자,스크랩수 */}
            <FlowBoxDetailBox>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img
                    src={Time}
                    alt="시간"
                    style={{ width: "38px", height: "38px" }}
                  />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.totalPlayTime}</FlowBoxDetail>
              </FlowBoxDetails>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img
                    src={View}
                    alt="조회수"
                    style={{ width: "38px", height: "38px" }}
                  />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.viewCount}</FlowBoxDetail>
              </FlowBoxDetails>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img
                    src={Write}
                    alt="작성자"
                    style={{ width: "35px", height: "35px" }}
                  />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.author.username}</FlowBoxDetail>
              </FlowBoxDetails>
              <FlowBoxDetails>
                <FlowBoxDetailImg>
                  <img
                    src={User}
                    alt="스크랩 수"
                    style={{ width: "24px", height: "24px" }}
                  />
                </FlowBoxDetailImg>
                <FlowBoxDetail>{data.scrapCount}</FlowBoxDetail>
              </FlowBoxDetails>
            </FlowBoxDetailBox>

            {/* 자세히 보기 */}
            <MoreBtn onClick={() => moveToMoreWatchFlow(data)}>
              자세히 보기
            </MoreBtn>
          </MyFlowBoxChild>
        ))}
      </MyFlowBoxParent>
    </div>
  );
}

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

const FlowBoxScrapBox = styled.div`
  width: 42px;
  height: 42px;
  position: absolute;
  margin-top: 37px;
  margin-left: 291px;
`;

const FlowBoxScrapImg = styled.img`
  position: absolute;
  width: 22px;
  height: 30px;
  cursor: pointer;
`;

const FlowBoxImg = styled.img`
  margin-top: 23px;
  margin-left: 36px;
  width: 142px;
  height: 142px;
`;

const FlowBoxDetailBox = styled.div`
  margin-left: 239px;
  margin-top: -168px;
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
