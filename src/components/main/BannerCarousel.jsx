import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import currentDotImg from '../../assets/main/bannerDotCurrent.svg';
import defaultDotImg from '../../assets/main/bannerDotDefault.svg';
import LeftArrow from '../button/LeftArrow';
import RightArrow from '../button/RightArrow';
import Banner from './Banner';

// 이전 배너 화살표
function PrevArrow({ className, onClick }) {
  return (
    <div className={className}>
      <LeftArrow onClick={onClick} />
    </div>
  );
}

// 다음 배너 화살표
function NextArrow({ className, onClick }) {
  return (
    <div className={className}>
      <RightArrow onClick={onClick} />
    </div>
  );
}

export default function BannerCarousel({ contents }) {
  const settings = {
    className: 'slider variable-width',
    dots: true,
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    arrow: false,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 4000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <StyledSlider {...settings}>
      {contents &&
        contents.map((banner) => (
          <div key={banner.index} style={{ width: '60rem' }}>
            <Banner contents={banner} />
          </div>
        ))}
    </StyledSlider>
  );
}

const StyledSlider = styled(Slider)`
  .slick-list {
    background-color: transparent;
    display: flex;
    align-items: center;
    margin-top: 6rem;
  }

  .slick-track {
    display: flex;
    gap: 8rem;
  }

  .slick-slide {
    transform: translateX(calc((100vw - 60rem) / 2));
  }

  .slick-arrow {
    position: absolute;
    z-index: 5;
    top: 48% !important;
  }

  .slick-arrow::before {
    display: none;
  }

  .slick-prev {
    left: calc((100vw - 60rem) / 2 - 1.3rem);
    width: 2.6rem;
  }

  .slick-next {
    left: calc((100vw + 60rem) / 2 - 1.3rem);
    width: 2.6rem;
  }

  .slick-dots {
    bottom: 1.2rem;
  }

  .slick-dots li button:before {
    width: 1rem;
    height: 1rem;
    display: flex;
    justify-content: center;
    opacity: 100%;

    content: url(${defaultDotImg});
  }

  .slick-dots li.slick-active button:before {
    content: url(${currentDotImg});
    opacity: 100%;
  }
`;
