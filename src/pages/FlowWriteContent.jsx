import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import write1 from '../assets/flowwrite/write_1.png';
import write2 from '../assets/flowwrite/write_2.png';
import write3 from '../assets/flowwrite/write_3.png';
import writeSelect4 from '../assets/flowwrite/write_select_4.png';
import line from '../assets/flowwrite/line.png';

export default function FlowWriteContent() {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/flow/my');
  };
  const handleBeforeClick = () => {
    navigate('/flow/write/recommend');
  };

    return (
        <FlowWriteWrap>
          <ProgressbarStyle>
            <ProgressBarItem>
              <img src={write1} alt="Write 1" style={{ width: '50px', height: '50px' }} />
              <span>기본정보</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
              <img src={write2} alt="Write 2" style={{ width: '50px', height: '50px' }} />
              <span>세부정보</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
              <img src={write3} alt="Write 3" style={{ width: '50px', height: '50px' }} />
              <span>추천 플로우</span>
              <img src={line} alt="line" style={{ width: '80px', height: '2px' }} />
            </ProgressBarItem>
            <ProgressBarItem>
            <img src={writeSelect4} alt="Write Select 4" style={{ width: '50px', height: '50px' }} />
              <span style={{ color: '#19297C' }}>플로우 내용</span>
            </ProgressBarItem>
          </ProgressbarStyle>
          <FlowwriteContent>
            <div>
              <ContentSelect>
                레크레이션 선택
              </ContentSelect>
              <ContentInfo>
                기본 정보
              </ContentInfo>
              <LastButton onClick={handleBeforeClick}>
                이전으로
              </LastButton>
              <SaveButton onClick={handleNextClick}>
                저장하기
              </SaveButton>
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
  background-color: #F7F8F9;
`;

const ProgressbarStyle = styled.div`
  width: 1356px;
  height: 156px;
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
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
    color: #CACDD2;
    font-size: 24px;
    font-weight: 700;
  }
`;

const FlowwriteContent = styled.div`
  width: 1356px;
  height: 450px;
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  margin-bottom: 45px;
`;

const ContentBase = styled.div`
  height: 60px;
  border-radius: 20px;
  border: 0.5px solid #9FA4A9;
  background: #FFF;
  display: inline-block;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  padding-top: 27px;
  padding-left: 38px;
`;

const ContentSelect = styled(ContentBase)`
  width: 606px;
  margin-left: 40px;
  margin-top: 40px;
`;

const ContentInfo = styled(ContentBase)`
  width: 570px;
  flex-grow: 1;
  margin-left: 20px;
`;

const LastButton = styled.button`
  width: 138px;
  height: 54px;
  color: #464C52;
  background-color: #fff;
  border: 1px solid #464C52;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 510px;
  margin-top: 35px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #F7F8F9; /* hover 시의 배경색 변경 */
  }
`;

const SaveButton = styled.button`
  width: 138px;
  height: 54px;
  background-color: #4036ED;
  border: none;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-left: 60px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
    background-color: #3530ED; /* hover 시의 배경색 변경 */
  }
`;