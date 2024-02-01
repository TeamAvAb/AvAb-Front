import React from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import blankImg from "../../assets/main/blankImg.png";
import nextIconImg from "../../assets/main/nextIcon.svg";
import prevIconImg from "../../assets/main/prevIcon.svg";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={nextIconImg}
      className={className}
      style={{ ...style, display: "block", width: "42px", height: "42px" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={prevIconImg}
      className={className}
      style={{ ...style, display: "block", width: "42px", height: "42px" }}
      onClick={onClick}
    />
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
    arrrow: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
  .slick-track {
    display: flex;
    gap: 100px;
  }
  .slick-slide {
    transform: translateX(270px);
  }
  .slick-arrow {
    position: absolute;
    z-index: 10;
  }
  .slick-prev {
    left: 253px;
  }
  .slick-next {
    right: 268px;
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
