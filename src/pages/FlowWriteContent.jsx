import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { isLoggedIn, publicAPI, privateAPI } from "../apis/user.js";
import qs from "qs";
import styled from "styled-components";
import write1 from "../assets/flowwrite/write_1.png";
import write2 from "../assets/flowwrite/write_2.png";
import write3 from "../assets/flowwrite/write_3.png";
import writeSelect4 from "../assets/flowwrite/write_select_4.png";
import line from "../assets/flowwrite/line.png";
import WithoutSaving from "../components/flowwrite/WithoutSavingModal.jsx";
// import TimeOut from '../components/flowwrite/TimeOutModal.jsx'
import NoTitle from "../components/flowwrite/NoTitleModal.jsx";
// import NoKeyword from '../components/flowwrite/NoKeywordModal.jsx'
import WriteSelectedRecreationInfo from "../components/flowwrite/WriteSelectedRecreationInfo.jsx";
import WriteRecreationInfo from "../components/flowwrite/WriteRecreationInfo.jsx";
import AddRecreationInfo from "../components/flowwrite/AddRecreationInfo.jsx";
import RecommendRecreation from "../components/flowwrite/RecommendRecreation.jsx";
import ScrapRecreation from "../components/flowwrite/ScrapRecreation.jsx";

export default function FlowWriteContent() {
  const navigate = useNavigate();
  const [titleModal, setTitleModal] = useState(null);
  const [saveModal, setSaveModal] = useState(null);
  const [flowTitle, setFlowTitle] = useState("");
  const [time] = useState(10);
  const [infoBoxes, setInfoBoxes] = useState([]);
  const [numOfRecreationInfo, setNumOfRecreationInfo] = useState(0);
  const [recreationData, setRecreationData] = useState([]);
  const [scrapRecreationData, setScrapRecreationData] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [playTime, setPlayTime] = useState("");
  const [selectedDetailKeywords, setSelectedDetailKeywords] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedGroupSize, setSelectedGroupSize] = useState("");
  const [selectedFlow, setSelectedFlow] = useState(null);

  const testJWT =
    "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MiwiaWF0IjoxNzA3Mjk1MzkzLCJleHAiOjE5MDcyOTg5OTN9.yEvU_V98IMhnC09lEL_BdxU7aQTx69BclrAd9zjZL64";

  useEffect(() => {
    // 페이지가 로드될 때 localStorage에서 playTime을 가져와서 상태를 설정합니다.
    localStorage.setItem("accessToken", testJWT);
    const savedPlayTime = localStorage.getItem("playTime");
    if (savedPlayTime) {
      setPlayTime(savedPlayTime);
    }
    // 로컬 스토리지에서 저장된 키워드(목적) 가져오기
    const savedKeywords = localStorage.getItem("selectedKeywords");

    if (savedKeywords) {
      const parsedKeywords = JSON.parse(savedKeywords);
      // 한글 키워드를 영어로 다시 매핑하여 저장
      const englishKeywords = parsedKeywords.map(
        (keyword) => keywordMappings[keyword]
      );
      setSelectedKeywords(englishKeywords);
    }
    // 로컬 스토리지에서 저장된 디테일 키워드 가져오기
    const storedDetailKeywords = localStorage.getItem("selectedDetailKeywords");
    if (storedDetailKeywords) {
      const parsedKeywords = JSON.parse(storedDetailKeywords);
      setSelectedDetailKeywords(parsedKeywords);
    }

    // 로컬 스토리지에서 저장된 성별 정보 가져오기
    const storedGenders = localStorage.getItem("selectedGenders");
    if (storedGenders) {
      const parsedGenders = JSON.parse(storedGenders);
      setSelectedGenders(parsedGenders);
    }

    // 로컬 스토리지에서 저장된 나이 정보 가져오기
    const storedAges = localStorage.getItem("selectedAges");
    if (storedAges) {
      const parsedAges = JSON.parse(storedAges);
      setSelectedAges(parsedAges);
    }

    // 로컬 스토리지에서 저장된 인원 정보 가져오기
    const storedGroupSize = localStorage.getItem("selectedGroupSize");
    if (storedGroupSize) {
      const parsedGroupSize = JSON.parse(storedGroupSize);
      setSelectedGroupSize(parsedGroupSize);
    }

    // 로컬 스토리지에서 저장된 플로우 추천 가져오기
    const storedFlow = localStorage.getItem('selectedFlow');
    if (storedFlow) {
      try {
        const parsedFlow = JSON.parse(storedFlow); // JSON 파싱
        setSelectedFlow(parsedFlow); // 상태에 저장

        // 콘솔로 데이터 확인
        console.log("Stored flow data:", parsedFlow); // 저장된 플로우 데이터 확인
      } catch (error) {
        console.error("Error parsing selectedFlow from localStorage:", error);
      }
    } else {
      console.log("No flow data found in localStorage."); // 로컬 스토리지에 데이터가 없을 경우
    }
  }, []);

  const keywordMappings = {
    WORKSHOP: "워크샵",
    SPORTS_DAY: "체육대회",
    MT: "MT",
    GATHERING: "모임",
    RETREAT: "수련회",
  };

  const DetailMappings = {
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

  // 정렬을 위한 함수
  const ageOrder = (age) => {
    switch (age) {
      case "10대 미만":
        return 0;
      case "10대":
        return 1;
      case "20대":
        return 2;
      case "30대":
        return 3;
      case "40대":
        return 4;
      case "50대 이상":
        return 5;
      default:
        return 6;
    }
  };

  // 연령대 정렬
  const sortedAges = selectedAges.slice().sort((a, b) => ageOrder(a) - ageOrder(b));

  const handleNextClick = () => {
    if (flowTitle.trim() === "") {
      setTitleModal(<NoTitle onClose={() => setTitleModal(null)} />);
    } else {
      try {
        const submit = async () => {
          const response = await privateAPI.post("/api/flows", {
            title: flowTitle,
            recreationSpecList: [
              {
                seq: 0,
                recreationId: 8,
                customTitle: "string",
                customPlayTime: 0,
                customKeywordList: ["QUICKNESS"],
              },
            ],
            totalPlayTime: playTime,
            participants: selectedGroupSize,
            ageList: selectedAges,
            purposeList: selectedKeywords,
            keywordList: selectedDetailKeywords,
            genderList: selectedGenders,
          });
          console.log(response);
        };
        submit();
      } catch (error) {
        console.log("저장 실패:", error);
      }
      navigate("/flow/my");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBeforeClick = () => {
    setSaveModal(<WithoutSaving onClose={() => setSaveModal(null)} />);
  };

  const handleSaveClick = () => {
    handleNextClick();
  };

  publicAPI.defaults.paramsSerializer = (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  };
  useEffect(() => {
    // API 호출 함수
    const fetchRecreationData = async () => {
      try {
        const savedPlayTime = localStorage.getItem("playTime");
        if (!savedPlayTime) {
          // playTime이 없는 경우에 대한 처리
          console.error("playTime이 저장되어 있지 않습니다.");
          return;
        }
        const englishKeywords = selectedKeywords.map(
          (keyword) => keywordMappings[keyword]
        );

        const response = await axios.get("http://avab-dev-env.eba-xbwj9mms.ap-northeast-3.elasticbeanstalk.com/api/recreations/recommended", {
          params: {
            playTime: savedPlayTime,
            purpose: englishKeywords.join(","),
          },
        });

        // API 응답에서 필요한 데이터만 추출하여 recreationData 상태를 업데이트
        setRecreationData(
          response.data.result.map((item) => ({
            id: item.id,
            title: item.title,
            totalStars: item.totalStars,
            keywordList: item.keywordList,
            imageUrl: item.imageUrl,
            summary: item.summary,
            isFavorite: item.isFavorite,
          }))
        );
      } catch (error) {
        console.error("Error fetching recreation data:", error);
      }
    };

    // API 호출 함수 호출
    fetchRecreationData();
  }, []);

  useEffect(() => {
    const getFavRec = async () => {
      try {
        const response = await axios.get(
          `https://dev.avab.shop/api/users/me/favorites/recreations?page=1`
        );
        console.log("추천레크 요청 응답 : ", response);
        setScrapRecreationData(
          response.data.result.map((item) => ({
            id: item.id,
            title: item.title,
            totalStars: item.totalStars,
            keywordList: item.keywordList,
            imageUrl: item.imageUrl,
            summary: item.summary,
            isFavorite: item.isFavorite,
          }))
        );
      } catch (error) {
        console.log("즐겨찾는 레크 받아오기 에러", error);
      }
    };
  });

  const handleFlowTitleChange = (e) => {
    // 사용자 입력이 변경될 때마다 flowTitle 상태 업데이트
    setFlowTitle(e.target.value);
  };

  const handleAddFlow = async () => {
    // 커스텀 플로우 박스 추가
    setInfoBoxes((prevInfoBoxes) => [
      ...prevInfoBoxes,
      <WriteRecreationInfo />,
    ]);
    setNumOfRecreationInfo(numOfRecreationInfo + 1);
  };

  const handleAddRecommendFlow = async (id) => {
    try {
      const savedPlayTime = localStorage.getItem("playTime");
      if (!savedPlayTime) {
        // playTime이 없는 경우에 대한 처리
        console.error("playTime이 저장되어 있지 않습니다.");
        return;
      }
      const englishKeywords = selectedKeywords.map(
        (keyword) => keywordMappings[keyword]
      );
      // API를 호출하여 데이터 가져오기
      const response = await axios.get("https://dev.avab.shop/api/recreations/recommended", {
        params: {
          playTime: savedPlayTime,
          purpose: englishKeywords.join(","),
        },
      });
      // 데이터에서 필요한 정보 추출
      const data = response.data.result.find((item) => item.id === id);
      if (data) {
        const { title, keywordList, playTime } = data;
        console.log("추가된 추천 레크레이션 데이터:", {
          title,
          keywordList,
          playTime,
        });
        // 추출한 정보를 저장
        return { title, keywordList, playTime };
      } else {
        console.error(`해당 id(${id})에 해당하는 데이터를 찾을 수 없습니다.`);
        return null;
      }
    } catch (error) {
      // 에러 발생 시 에러 처리
      console.error("추가 중 오류 발생:", error);
      return null;
    }
  };

  const handleAddScrapFlow = async () => {
    try {
      console.log("API 호출 전");
      const response = await axios.get(`https://dev.avab.shop/api/users/me/favorites/recreations?page=0`, {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${testJWT}`,
        },
      });
      console.log(" 스크랩 레크 응답 데이터:", response.data);
      setScrapRecreationData(
        response.data.result.recreationList.map((item) => ({
          id: item.id,
          title: item.title,
          totalStars: item.totalStars,
          keywordList: item.keywordList,
          imageUrl: item.imageUrl,
          summary: item.summary,
          isFavorite: item.isFavorite,
        }))
      );
    } catch (error) {
      // 에러 발생 시 에러 처리
      console.error("추가 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    handleAddScrapFlow();
    console.log(scrapRecreationData);
  }, []);

  useEffect(() => {
    // 데이터에서 필요한 정보 추출
    const { title, keywordList, playTime } = scrapRecreationData;
    console.log("추가된 즐겨찾는 레크레이션 데이터:", {
      title,
      keywordList,
      playTime,
    });
  }, [scrapRecreationData]);

  FlowWriteContent.handleAddRecommendFlow = handleAddRecommendFlow;
  FlowWriteContent.handleAddScrapFlow = handleAddScrapFlow;

  const handleDelete = (index) => {
    // 플로우 박스 삭제
    setInfoBoxes((prevInfoBoxes) =>
      prevInfoBoxes.filter((_, i) => i !== index) // 인덱스를 기준으로 삭제
    );
  };

  return (
    <FlowWriteWrap>
      {saveModal && saveModal}
      {titleModal && titleModal}
      <ProgressbarStyle>
        <ProgressBarItem>
          <img
            src={write1}
            alt="Write 1"
            style={{ width: "50px", height: "50px" }}
          />
          <span>기본정보</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img
            src={write2}
            alt="Write 2"
            style={{ width: "50px", height: "50px" }}
          />
          <span>세부정보</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img
            src={write3}
            alt="Write 3"
            style={{ width: "50px", height: "50px" }}
          />
          <span>추천 플로우</span>
          <img src={line} alt="line" style={{ width: "80px", height: "2px" }} />
        </ProgressBarItem>
        <ProgressBarItem>
          <img
            src={writeSelect4}
            alt="Write Select 4"
            style={{ width: "50px", height: "50px" }}
          />
          <span style={{ color: "#19297C" }}>플로우 내용</span>
        </ProgressBarItem>
      </ProgressbarStyle>
      <FlowwriteContent>
        <div>
          <FlowInfoContainer>
            <FlowInfoBox>
              <ContentSelect>
                <div style={{ marginLeft: "38px" }}>레크레이션 선택</div>
              </ContentSelect>
              <ContentSelectDetail>추천 레크레이션</ContentSelectDetail>
              <RecommendRecreation
                content={recreationData}
                handleAddRecommendFlow={handleAddRecommendFlow}
              />
              <ContentSelectDetail>즐겨찾는 레크레이션</ContentSelectDetail>
              <ScrapRecreation
                content={scrapRecreationData}
                handleAddScrapFlow={handleAddScrapFlow}
              />
            </FlowInfoBox>
          </FlowInfoContainer>
  
          <FlowInfoContainer>
            <FlowInfoBox>
              <ContentInfo>
                <div>기본정보</div>
                <div>세부정보</div>
              </ContentInfo>
              <ContentInfoDetail>
                <div style={{ marginLeft: "20px", marginTop: "56px" }}>
                  <div style={{ display: "flex", marginBottom: "8px" }}>
                    <div
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                      }}
                    >
                      목적
                    </div>
                    <div>
                      <div>
                        {selectedKeywords.join(", ")}
                      </div>
                    </div>
                    </div>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                      }}
                    >
                      플레이 시간
                    </div>
                    <div>{playTime}분</div>
                  </div>
                </div>
  
                <Line></Line>
  
                <div style={{ marginTop: "29px" }}>
                  <div style={{ display: "flex", marginBottom: "8px" }}>
                    <div
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                      }}
                    >
                      키워드
                    </div>
                    <div>
                      {selectedDetailKeywords
                        .map((keyword) => DetailMappings[keyword])
                        .join(", ")}
                    </div>
                  </div>
                  <div style={{ display: "flex", marginBottom: "8px" }}>
                    <div
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                      }}
                    >
                      성별
                    </div>
                    <div>
                      {selectedGenders
                        .map((gender) => (gender === "F" ? "여성" : "남성"))
                        .join(", ")}
                    </div>
                  </div>
                  <div style={{ display: "flex", marginBottom: "8px" }}>
                    <div
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                      }}
                    >
                      연령대
                    </div>
                    <div>
                    {sortedAges
                        .map((age) =>
                          age === "UNDER_TEENAGER"
                            ? "10대 미만"
                            : age === "TEENAGER"
                            ? "10대"
                            : age === "TWENTIES"
                            ? "20대"
                            : age === "THIRITES"
                            ? "30대"
                            : age === "FORTIES"
                            ? "40대"
                            : "50대 이상"
                        )
                        .join(", ")}
                    </div>
                  </div>
                  <div style={{ display: "flex", marginBottom: "8px" }}>
                    <div
                      style={{
                        marginRight: "8px",
                        fontSize: "16px",
                        fontStyle: "normal",
                        fontWeight: "600",
                      }}
                    >
                      인원
                    </div>
                    <div>{localStorage.getItem("selectedGroupSize")}명</div>
                  </div>
                </div>
              </ContentInfoDetail>
  
              <ContentTitle>
                <div style={{ marginLeft: "38px" }}>일정플로우 제목</div>
              </ContentTitle>
  
              {/* ContentTitleInput에서 플로우 제목을 입력받음 */}
              <ContentTitleInput
                type="text"
                placeholder="일정플로우의 제목을 입력해주세요."
                value={flowTitle}
                onChange={handleFlowTitleChange}
              />
  
              <FlowContainer>
                <div style={{ width: "393px", textAlign: "center" }}>
                  {/* FlowTitle에 상태로부터 받은 값을 전달 */}
                  <FlowTitle hasTitle={!!flowTitle}>
                    {flowTitle || "플로우 제목"}
                  </FlowTitle>
                </div>
  
                <div>
                  {/* 선택한 플로우의 레크레이션 표시 */}
                  {selectedFlow && selectedFlow.recreations && selectedFlow.recreations.length > 0 ? (
                    selectedFlow.recreations.map((rec, index) => (
                      <WriteSelectedRecreationInfo 
                        key={rec.id} // 고유한 ID를 키로 사용
                        num={index} // 박스 번호를 전달
                        title={rec.title || "제목 없음"} // 레크레이션 제목
                        onDelete={() => handleDelete(index)} // 삭제 기능 처리
                        selectedKeywords={rec.keywordList || []} // 레크레이션 키워드
                        time={rec.playTime || 0} // 플레이 시간
                      />
                    ))
                  ) : null}

                  {/* 기본 레크레이션 박스 : 추천 플로우가 선택되지 않았을 경우에만 표시 */}
                  {!(selectedFlow && selectedFlow.recreations && selectedFlow.recreations.length > 0) && infoBoxes.map((box, index) => (
                    <div key={`infoBox-${index}`}>
                      {React.cloneElement(box, {
                        num: index, // 인덱스를 num으로 전달
                        onDelete: () => handleDelete(index), // 인덱스를 전달하여 삭제 기능 추가
                      })}
                    </div>
                  ))}
                  {!(selectedFlow && selectedFlow.recreations && selectedFlow.recreations.length > 0) && (
                    <WriteRecreationInfo
                      key={numOfRecreationInfo}
                      time={time}
                      num={infoBoxes.length} // 마지막 박스의 num 설정
                      onDelete={() => handleDelete(infoBoxes.length - 1)} // 마지막 박스의 삭제 기능
                    />
                  )}
                </div>
  
                <AddFlowButton onClick={handleAddFlow}>+</AddFlowButton>
              </FlowContainer>
            </FlowInfoBox>
          </FlowInfoContainer>
  
          <LastButton onClick={handleBeforeClick}>이전으로</LastButton>
          <SaveButton onClick={handleSaveClick}>저장하기</SaveButton>
        </div>
      </FlowwriteContent>
    </FlowWriteWrap>
  );
}  

const FlowWriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f8f9;
`;

const ProgressbarStyle = styled.div`
  width: 1356px;
  height: 156px;
  background-color: #fff;
  border: 0.5px solid #cacdd2;
  border-radius: 20px;
  display: flex;
  margin-bottom: 33px;
  justify-content: center;
  align-items: center;
  margin-top: 38px;
`;

const ProgressBarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    margin-right: 10px;
    margin-left: 10px;
  }

  span {
    color: #cacdd2;
    font-size: 24px;
    font-weight: 700;
  }
`;

const FlowwriteContent = styled.div`
  width: 1356px;
  background-color: #fff;
  border: 0.5px solid #cacdd2;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 45px;
  padding-bottom: 57px;
`;

const ContentBase = styled.div`
  height: 83px;
  border-radius: 20px;
  border: 1px solid #cacdd2;
  background: white;
  display: flex;
  align-items: center;
  margin-bottom: 13px;
  gap: 225px;
  font-size: 24px;
  font-weight: 700;
`;

const ContentSelect = styled(ContentBase)`
  width: 606px;
  margin-left: 40px;
`;

const ContentInfo = styled(ContentBase)`
  width: 608px;
  flex-grow: 1;
  margin-left: 20px;
  justify-content: center;
`;

const ContentTitle = styled(ContentBase)`
  width: 608px;
  margin-left: 20px;
  margin-top: 30px;
`;

const FlowInfoContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  margin-left: 28px;
  width: 608px;
`;

const FlowInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentSelectDetail = styled.div`
  width: 608px;
  height: 51px;
  border-radius: 20px;
  background: #f7f8f9;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 700;
`;

const ContentInfoDetail = styled.div`
  width: 608px;
  height: 158px;
  border-radius: 20px;
  background: #f7f8f9;
  margin-left: 20px;
  display: flex;
`;

const ContentTitleInput = styled.input`
  width: 590px;
  height: 51px;
  border-radius: 20px;
  border: none;
  outline: none;
  background: #f7f8f9;
  margin-left: 20px;
  margin-bottom: 120px;
  padding-left: 18px;
  display: flex;
  align-items: center;
  font-size: 20px;
  font-weight: 400;

  &::placeholder {
    color: #9fa4a9;
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const FlowContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 70px;
  margin-bottom: 40px;
  align-items: flex-start;
  border-radius: 20px;
  border: 0.5px solid #9fa4a9;
  background: white;
`;

const RecreationBox = styled.div`
  border: 1px solid #cacdd2;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  width: 100%;
`;

const Line = styled.div`
  border: 0.25px solid #cacdd2;
  height: 100px;
  margin-top: 29px;
  margin-left: 169px;
  margin-right: 20px;
`;

const FlowTitle = styled.div`
  margin-bottom: 59px;
  font-size: 24px;
  font-weight: 700;
  color: ${(props) => (props.hasTitle ? "black" : "#9FA4A9")};
`;

const AddFlowButton = styled.button`
  width: 246px;
  height: 53px;
  box-shadow: 0px 0px 20px 0px rgba(27, 29, 31, 0.15);
  border: none;
  border-radius: 20px;
  margin-top: 59px;
  margin-left: 75px;
  margin-bottom: 29px;
  font-size: 30px;
  background-color: #f7f8f9;

  &:hover {
    background-color: #5950ed;
    color: #fff;
    box-shadow: 0px 0px 20px 0px rgba(27, 29, 31, 0.15);
  }
`;

const LastButton = styled.button`
  width: 138px;
  height: 54px;
  color: #464c52;
  background-color: #fff;
  border: 1px solid #464c52;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 510px;
  margin-top: 87px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #f7f8f9; /* hover 시의 배경색 변경 */
  }
`;

const SaveButton = styled.button`
  width: 138px;
  height: 54px;
  background-color: #4036ed;
  border: none;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-left: 60px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #3530ed; /* hover 시의 배경색 변경 */
  }
`;
