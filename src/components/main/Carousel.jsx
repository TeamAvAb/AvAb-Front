import React, { useState, Component } from "react";
import styled from "styled-components";
import blankImg from "../../assets/main/blankImg.png";
import bannerIndexImg from "../../assets/main/bannerIndexIcon.svg";
import prevIconImg from "../../assets/main/prevIcon.svg";
import nextIconImg from "../../assets/main/nextIcon.svg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// export default function Carousel({ content }) {
//   const settings = {
//     dots: true,
//     arrow: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoPlay: true,
//   };
//   return (
//     <StyledSlider {...settings}>
//       {content.map((el) => (
//         <div key={el.title}>
//           <Title>{el.title}</Title>
//           <Description>{el.description}</Description>
//         </div>
//       ))}
//     </StyledSlider>
//   );
// }

export default function Carousel({ content }) {
  const [current, setCurrent] = useState(2);
  return (
    <Container>
      {/* <NextBtn></NextBtn> */}
      <img src={prevIconImg} style={{ position: "fixed", left: "263px" }} />
      {content.map((el) => (
        <Banner>
          <Text>
            <Title>{el.title}</Title>
            <Description>{el.description}</Description>
            <GotoRecBtn>레크레이션 보러가기</GotoRecBtn>
          </Text>
          <img src={blankImg} style={{ width: "161px", height: "161px" }} />
        </Banner>
      ))}
      <img src={nextIconImg} style={{ position: "fixed", right: "263px" }} />
      <img
        src={bannerIndexImg}
        style={{
          width: "74px",
          height: "14px",
          position: "absolute",
          left: "50%",
          bottom: "30px",
        }}
      />
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 100px;
  overflow: hidden;
  position: relative;
`;
const Banner = styled.div`
  width: 957px;
  height: 254px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 46px 90px 30px 80px;
  border-radius: 20px;
  background: var(--main-4036-ed, #4036ed);
  box-shadow: 0px 0px 60px 20px rgba(0, 0, 0, 0.1);
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.span`
  margin-bottom: 10px;
  color: var(--gray-scale-e-9-ebed, #e9ebed);
  font-size: 24px;
  font-weight: 700;
`;
const Description = styled.span`
  margin-bottom: 25px;
  color: var(--gray-scale-e-9-ebed, #e9ebed);
  font-size: 20px;
  font-weight: 700;
`;
const GotoRecBtn = styled.button`
  padding: 15px 34px;
  text-align: center;
  border: none;
  border-radius: 50px;
  background: var(--gray-scale-f-7-f-8-f-9, #f7f8f9);
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-size: 20px;
  font-weight: 700;
`;
