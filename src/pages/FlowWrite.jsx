import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import writeSelect1 from '../assets/flowwrite/write_select_1.png';
import write2 from '../assets/flowwrite/write_2.png';
import write3 from '../assets/flowwrite/write_3.png';
import write4 from '../assets/flowwrite/write_4.png';
import line from '../assets/flowwrite/line.png';
// import filter from '../assets/flowwrite/filter.png';

export default function FlowWrite() {
  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate('/flow/write/detail');
  };

  return (
    <FlowWriteWrap>
      <ProgressbarStyle>
        <ProgressBarItem>
          <img src={writeSelect1} alt="Write Select 1" style={{ width: '50px', height: '50px' }} />
          <span style={{ color: '#19297C' }}>기본정보</span>
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
<<<<<<< HEAD
          <img src={write4} alt="Write 4" style={{ width: '50px', height: '50px' }} />
=======
        <img src={write4} alt="Write 4" style={{ width: '50px', height: '50px' }} />
>>>>>>> dev
          <span>플로우 내용</span>
        </ProgressBarItem>
      </ProgressbarStyle>
      <FlowwriteBasic>
        <div>
<<<<<<< HEAD
          <TextLine>레크레이션의 목적을 입력해주세요.</TextLine>
          <PurposeSearch>
            {/* <img src={filter} alt="Filter" style={{ width: '25px', height: '25px' }} /> */}
            <PurposeInput type="text" placeholder="다른 사용자는 '대학교 MT'를 입력했어요!" style={{ width: '90%', height: '18px' }} />
          </PurposeSearch>
          <TextLine>레크레이션의 총 플레이 시간을 선택해주세요.</TextLine>
          <PlayTime></PlayTime>
          <OutButton>페이지 나가기</OutButton>
          <NextButton onClick={handleNextClick}>다음으로</NextButton>
=======
        <TextLine>레크레이션의 목적을 입력해주세요.</TextLine>
        <PurposeSearch>
          {/* <img src={filter} alt="Filter" style={{ width: '25px', height: '25px' }} /> */}
          <PurposeInput type="text" placeholder="다른 사용자는 '대학교 MT'를 입력했어요!" style={{ width: '90%', height: '18px'}} />
        </PurposeSearch>
        <TextLine>레크레이션의 총 플레이 시간을 선택해주세요.</TextLine>
        <PlayTime>

        </PlayTime>
          <OutButton>
            페이지 나가기
          </OutButton>
          <NextButton onClick={handleNextClick}>
            다음으로
          </NextButton>
>>>>>>> dev
        </div>
      </FlowwriteBasic>
    </FlowWriteWrap>
  );
}

const FlowWriteWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
<<<<<<< HEAD
  background-color: #f7f8f9;
=======
  background-color: #F7F8F9;
>>>>>>> dev
`;

const ProgressbarStyle = styled.div`
  width: 1356px;
  height: 156px;
<<<<<<< HEAD
  background-color: #fff;
  border: 0.5px solid #cacdd2;
=======
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
>>>>>>> dev
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
<<<<<<< HEAD
    color: #cacdd2;
=======
    color: #CACDD2;
>>>>>>> dev
    font-size: 24px;
    font-weight: 700;
  }
`;

const FlowwriteBasic = styled.div`
  width: 1356px;
  height: 450px;
<<<<<<< HEAD
  background-color: #fff;
  border: 0.5px solid #cacdd2;
=======
  background-color: #FFF;
  border: 0.5px solid #CACDD2;
>>>>>>> dev
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin-bottom: 45px;
`;

const TextLine = styled.div`
  color: #000;
  font-size: 24px;
  line-height: 1.5; /* 추가: 줄 간격 조절 */
  margin-left: 116px;
  margin-top: 40px;
  margin-bottom: 21px;
  font-weight: 700;
`;

const PurposeSearch = styled.div`
  width: 808px;
  height: 63px;
  border-radius: 20px;
<<<<<<< HEAD
  border: 0.5px solid #9fa4a9;
  background: #fff;
=======
  border: 0.5px solid #9FA4A9;
  background: #FFF;
>>>>>>> dev
  margin-left: 116px;
  display: flex;
  align-items: center;

  img {
    margin-left: 13px;
  }
`;

const PurposeInput = styled.input`
  width: 90%;
  height: 18px;
  margin-left: 20px;
  border: none;
  outline: none;

  &::placeholder {
<<<<<<< HEAD
    color: #9fa4a9;
=======
    color: #9FA4A9;
>>>>>>> dev
  }

  &:focus::placeholder {
    color: transparent;
  }
`;

const PlayTime = styled.div`
  width: 161px;
  height: 63px;
  border-radius: 20px;
<<<<<<< HEAD
  border: 0.5px solid #9fa4a9;
  background: #fff;
=======
  border: 0.5px solid #9FA4A9;
  background: #FFF;
>>>>>>> dev
  margin-left: 116px;
`;

const OutButton = styled.button`
  width: 177px;
  height: 54px;
<<<<<<< HEAD
  color: #464c52;
  background-color: #fff;
  border: 1px solid #464c52;
=======
  color: #464C52;
  background-color: #fff;
  border: 1px solid #464C52;
>>>>>>> dev
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  cursor: pointer;
  margin-left: 490px;
  margin-top: 35px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
<<<<<<< HEAD
    background-color: #f7f8f9; /* hover 시의 배경색 변경 */
=======
    background-color: #F7F8F9; /* hover 시의 배경색 변경 */
>>>>>>> dev
  }
`;

const NextButton = styled.button`
  width: 138px;
  height: 54px;
<<<<<<< HEAD
  background-color: #4036ed;
=======
  background-color: #4036ED;
>>>>>>> dev
  border: none;
  border-radius: 50px;
  font-size: 19px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
  margin-left: 60px;

  /* 선택적으로 hover 효과 추가 */
  &:hover {
<<<<<<< HEAD
    background-color: #3530ed; /* hover 시의 배경색 변경 */
  }
`;
=======
    background-color: #3530ED; /* hover 시의 배경색 변경 */
  }
`;
>>>>>>> dev
