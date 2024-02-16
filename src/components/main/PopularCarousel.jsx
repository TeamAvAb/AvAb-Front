import React, { useState, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import RecreationPrev from "./RecreationPrev";

import elipseImg from "../../assets/main/elipse.svg";
import prevArrowImg from "../../assets/main/prevArrowIcon.svg";
import nextArrowImg from "../../assets/main/nextArrowIcon.svg";
import prevSlide from "../../assets/main/prevSlide.svg";
import nextSlide from "../../assets/main/nextSlide.svg";
import wholeSlide from "../../assets/main/wholeSlide.svg";
import currentSlide from "../../assets/main/currentSlide.svg";

export default function PopularCarousel({ content }) {
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    className: "slider variable-width",
    infinite: true,
    centerMode: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    arrrow: false,
    speed: 2000,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => {
      return setSlideIndex(next);
    },
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <StyledSlider ref={slider} {...settings}>
        {content &&
          content.map((banner) => (
            <div key={banner.index} style={{ width: "284px" }}>
              <RecreationPrev content={banner} />
            </div>
          ))}
      </StyledSlider>
      <SlideIndex index={slideIndex / 3 + 1}>
        <ProgressBar>
          <WholeSlide src={wholeSlide} />
          <CurrentSlide src={currentSlide} index={slideIndex / 3 + 1} />
        </ProgressBar>
        <SlideControl>
          <img
            src={prevSlide}
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
            onClick={() => slider?.current?.slickPrev()}
          />
          <span>{slideIndex / 3 + 1}/3</span>
          <img
            src={nextSlide}
            style={{ width: "24px", height: "24px", cursor: "pointer" }}
            onClick={() => slider?.current?.slickNext()}
          />
        </SlideControl>
      </SlideIndex>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  width: 918px;
  margin-top: 120px;

  .slick-list {
    background-color: transparent;
  }
  .slick-track {
    display: flex;
    gap: 22px;
  }
  .slick-slide {
    transform: translateX(10px);
  }
  .slick-arrow {
    position: absolute;
    z-index: 5;
  }
  .slick-arrow::before {
    display: none;
  }
`;

function PrevArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      style={{
        display: "block",
        width: "42px",
        height: "42px",
        border: "none",
        position: "absolute",
        top: "206px",
        left: "-10px",
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
function NextArrow(props) {
  const { className, onClick } = props;
  return (
    <div
      style={{
        display: "block",
        width: "42px",
        height: "42px",
        border: "none",
        position: "absolute",
        top: "206px",
        right: "-10px",
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
const SlideIndex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 26px;
  position: relative;
`;
const ProgressBar = styled.div`
  position: relative;
  width: 756px;
`;
const WholeSlide = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;
const CurrentSlide = styled.img`
  position: absolute;
  top: -1px;
  left: ${(props) =>
    props.index === 1 ? "0" : props.index === 2 ? "252px" : "504px"};
`;
const SlideControl = styled.div`
  width: 116px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: var(--gray-scale-1-b-1-d-1-f, #1b1d1f);
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;
