import React, { useState, useRef } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import WriteRecreationPrev from "../../components/flowwrite/WriteRecreationPrev";

import elipseImg from "../../assets/main/elipse.svg";
import prevArrowImg from "../../assets/main/prevArrowIcon.svg";
import nextArrowImg from "../../assets/main/nextArrowIcon.svg";

export default function ScrapRecreation({ content, handleAddScrapFlow }) {
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    className: "slider variable-width",
    infinite: false,
    centerMode: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    variableWidth: true,
    arrrow: false,
    speed: 500,
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
            <div key={banner.id} style={{ width: "284px" }}>
              <WriteRecreationPrev content={banner} handleAddScrapFlow={handleAddScrapFlow} />
            </div>
          ))}
      </StyledSlider>
      <SlideIndex index={slideIndex / 3 + 1}>
      </SlideIndex>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  width: 647px;

  .slick-list {
    background-color: transparent;
  }
  .slick-track {
    display: flex;
    gap: 10px;
    transform: none;
  }
  .slick-slide {
    transform: translateX(40px);
  }
  .slick-arrow {
    position: absolute;
    z-index: 10;
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
        left: "25px",
      }}
      className={className}
      onClick={onClick}
    >
      <img
        src={elipseImg}
        alt="Elipse"
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
        alt="PrevArrow"
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
        right: "10px",
      }}
      className={className}
      onClick={onClick}
    >
      <img
        src={elipseImg}
        alt="Elipse"
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
        alt="NextArrow"
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