import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { privateAPI, publicAPI } from '../../apis/user';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import RecreationTripleSet from './RecreationTripleSet';
import prevSlide from '../../assets/main/prevSlide.svg';
import nextSlide from '../../assets/main/nextSlide.svg';
import wholeSlide from '../../assets/main/wholeSlide.svg';
import currentSlide from '../../assets/main/currentSlide.svg';
import useLoginStore from '../../stores/loginStore';
import LeftArrow from '../button/LeftArrow';
import RightArrow from '../button/RightArrow';

export default function PopularRecreationCarousel() {
  const { isLoggedIn } = useLoginStore((state) => state);
  const [data, setData] = useState();
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);
  const settings = {
    className: 'slider',
    infinite: true,
    centerMode: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrow: false,
    speed: 2000,
    autoplay: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    beforeChange: (current, next) => {
      return setSlideIndex(next);
    },
  };

  useEffect(() => {
    const call = async () => {
      try {
        if (isLoggedIn) {
          const response = await privateAPI.get('/api/recreations');
          if (response.status === 200) {
            setData([
              response.data.result.recreationList.slice(0, 3),
              response.data.result.recreationList.slice(3, 6),
              response.data.result.recreationList.slice(6, 9),
            ]);
          } else {
            console.log('인기 레크 로드 요청 에러 : ', response);
          }
        } else {
          const response = await publicAPI.get('/api/recreations');
          if (response.status === 200) {
            setData([
              response.data.result.recreationList.slice(0, 3),
              response.data.result.recreationList.slice(3, 6),
              response.data.result.recreationList.slice(6, 9),
            ]);
          } else {
            console.log('인기 레크 로드 요청 에러 : ', response);
          }
        }
      } catch (error) {
        console.log('인기 레크 로드 요청 에러 : ', error);
      }
    };
    call();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <StyledSlider ref={slider} {...settings}>
        {data && data.map((banner) => <RecreationTripleSet dataset={banner} key={banner.id} />)}
      </StyledSlider>
      <SlideIndex $index={slideIndex + 1}>
        <ProgressBar>
          <WholeSlide src={wholeSlide} />
          <CurrentSlide src={currentSlide} index={slideIndex + 1} />
        </ProgressBar>
        <SlideControl>
          <img
            src={prevSlide}
            style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            onClick={() => slider?.current?.slickPrev()}
            alt="이전"
          />
          <span>{slideIndex + 1} / 3</span>
          <img
            src={nextSlide}
            style={{ width: '1.2rem', height: '1.2rem', cursor: 'pointer' }}
            onClick={() => slider?.current?.slickNext()}
            alt="다음"
          />
        </SlideControl>
      </SlideIndex>
    </div>
  );
}

const StyledSlider = styled(Slider)`
  width: 60rem;
  margin-top: 7.5rem;
  margin-bottom: 2rem;

  .slick-list {
    background-color: transparent;
  }

  .slick-track {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .slick-slide {
    width: 100%;
  }

  .slick-arrow {
    position: absolute;
    z-index: 5;
    top: 55%;
  }

  .slick-arrow::before {
    display: none;
  }
`;

function PrevArrow({ className, onClick }) {
  return (
    <div className={className} style={{ left: '0.5rem' }}>
      <LeftArrow onClick={onClick} />
    </div>
  );
}

function NextArrow({ className, onClick }) {
  return (
    <div className={className} style={{ right: '2rem' }}>
      <RightArrow onClick={onClick} />
    </div>
  );
}

const SlideIndex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
  position: relative;
`;

const ProgressBar = styled.div`
  position: relative;
  width: 47rem;
`;

const WholeSlide = styled.img`
  position: absolute;
  top: 0;
  left: 0;
`;

const CurrentSlide = styled.img`
  position: absolute;
  top: -1px;
  left: ${({ index }) => (index === 1 ? '0' : index === 2 ? '15.7rem' : '31.5rem')};
  transition: left 1.3s ease-in-out;
`;

const SlideControl = styled.div`
  width: 7.2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.color.grayscale01};
  font-size: 1rem;
  font-weight: 400;
  line-height: normal;
`;
