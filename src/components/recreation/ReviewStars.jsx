import styled from "styled-components";
import React, {useState} from "react";
import yellowStar from "../../assets/recreation/yellowStar.svg";
import greyStar from "../../assets/recreation/greyStar.svg";

export default function ReviewStars() {
    // 별점 기본값 설정
    const [clicked, setClicked] = useState([false, false, false, false, false]);
    // 별을 5개로 표현하기 위한 더미 배열 
    const array = [0, 1, 2, 3, 4]
    
    // 별점 변경 함수
    const starScore = index => {
        let star = [...clicked];
        for (let i = 0; i < 5; i++) {
            star[i] = i <= index ? true : false;
        }
        setClicked(star);
    };

    // 현재 선택한 별점 개수
    let clickedStarNum = clicked.filter(element => true === element).length; 
  
    return (
    <>
    <ReviewStarstainer>
        <StarsWrap>
        {array.map((index) => (
            <img
              key={index}
              onClick={() => starScore(index)}
              src={clicked[index] ? yellowStar : greyStar} // clicked 배열이 true이면 yellowStar, false이면 greyStar을 출력
              alt = "starIcon"
            />))}
    </StarsWrap>
    </ReviewStarstainer>
    <StarNum>{clickedStarNum}/5</StarNum>
    </>
  );
}

const ReviewStarstainer = styled.div`
    display: flex;
    align-items: center;
    margin: 0px 20px;
`;

const StarsWrap = styled.div`
    width: 112px;
    display: flex;
    justify-content: space-between;
`;

const StarNum = styled.div`
    display: flex;
    align-items: center;
    color: #26282B;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
`