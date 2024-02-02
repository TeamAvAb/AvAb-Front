import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import blankImg from "../../assets/main/blankImg.png";
import elipseImg from "../../assets/main/elipse.svg";
import prevArrowImg from "../../assets/main/prevArrowIcon.svg";
import nextArrowImg from "../../assets/main/nextArrowIcon.svg";

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      style={{
        display: "block",
        width: "42px",
        height: "42px",
        border: "none",
        position: "absolute",
        top: "118px",
      }}
      className={className}
      onClick={onClick}
    >
      <img
        src={elipseImg}
        style={{
          width: "42px",
          height: "42px",
          position: "absolute",
          top: "0",
          left: "0",
          filter: "drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15))",
        }}
      />
      <img
        src={prevArrowImg}
        style={{
          display: "block",
          width: "8px",
          height: "16px",
          position: "absolute",
          top: "13px",
          left: "17px",
        }}
      />
    </div>
  );
}
function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      style={{
        display: "block",
        width: "42px",
        height: "42px",
        border: "none",
        position: "absolute",
        top: "118px",
      }}
      className={className}
      onClick={onClick}
    >
      <img
        src={elipseImg}
        style={{
          width: "42px",
          height: "42px",
          position: "absolute",
          top: "0",
          right: "0",
          filter: "drop-shadow(0px 5px 10px rgba(27, 29, 31, 0.15))",
        }}
      />
      <img
        src={nextArrowImg}
        style={{
          display: "block",
          width: "8px",
          height: "16px",
          position: "absolute",
          top: "13px",
          right: "17px",
        }}
      />
    </div>
  );
}

export default function Carousel({ content }) {
  const settings = {
    className: "slider variable-width",
    dots: true,
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrrow: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };

  const getColor = (id) => {
    switch (id) {
      case 1:
        return [
          "var(--main-a-0-ddff, #A0DDFF)",
          "var(--gray-scale-1-b-1-d-1-f, #1B1D1F)",
          "var(--gray-scale-26282-b, #26282B)",
          "#FFF",
        ];
      case 2:
        return [
          "var(--main-4036-ed, #4036ED)",
          "var(--gray-scale-e-9-ebed, #E9EBED)",
          "var(--gray-scale-f-7-f-8-f-9, #F7F8F9)",
          "var(--gray-scale-1-b-1-d-1-f, #1B1D1F)",
        ];
      case 3:
        return [
          "var(--main-ffaa-29, #FFAA29)",
          "var(--gray-scale-1-b-1-d-1-f, #1B1D1F)",
          "var(--gray-scale-26282-b, #26282B)",
          "#FFF",
        ];
      default:
        return "black";
    }
  };

  return (
    <StyledSlider {...settings}>
      {content.map((banner) => (
        <div style={{ width: "957px" }}>
          <Banner color={getColor(banner.index)}>
            <Left>
              <Title color={getColor(banner.index)}>{banner.title}</Title>
              <Comment color={getColor(banner.index)}>
                {banner.description}
              </Comment>
              <Button color={getColor(banner.index)}>
                레크레이션 보러가기
              </Button>
            </Left>

            <img src={blankImg} style={{ width: "161px", height: "161px" }} />
          </Banner>
        </div>
      ))}
    </StyledSlider>
  );
}

const StyledSlider = styled(Slider)`
  .slick-list {
    background-color: transparent;
  }
  .slick-track {
    display: flex;
    gap: 100px;
  }
  .slick-slide {
    transform: translateX(290px);
  }
  .slick-arrow {
    position: absolute;
    z-index: 10;
  }
  .slick-arrow::before {
    display: none;
  }
  .slick-prev {
    left: 263px;
  }
  .slick-next {
    right: 247px;
  }
  .slick-dots {
    position: absolute;
    bottom: 30px;
  }
`;

const Banner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 46px 90px 47px 80px;
  background: ${(props) => props.color[0]};
  border-radius: 20px;
  box-shadow: 0px 0px 60px 20px rgba(0, 0, 0, 0.1);
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  color: var(--gray-scale-e-9-ebed, #e9ebed);
`;
const Title = styled.span`
  margin-bottom: 10px;
  color: ${(props) => props.color[1]};
  font-size: 24px;
  font-weight: 700;
`;
const Comment = styled.span`
  margin-bottom: 25px;
  color: ${(props) => props.color[1]};
  font-size: 20px;
  font-weight: 700;
`;
const Button = styled.button`
  padding: 15px 34px;
  text-align: center;
  border: none;
  border-radius: 50px;
  background: ${(props) => props.color[2]};
  color: ${(props) => props.color[3]};
  font-size: 20px;
  font-weight: 700;
`;
