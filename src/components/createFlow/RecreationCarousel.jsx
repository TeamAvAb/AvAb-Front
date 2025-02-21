import styled from 'styled-components';
import RightArrow from '../common/button/RightArrow';
import LeftArrow from '../common/button/LeftArrow';
import { usePrevNextButtons } from '../../hooks/usePrevNextButtons';
import RecreationCard from './RecreationCard';
import { useEffect } from 'react';
import useCarousel from '../../hooks/useCarousel';

function PrevArrow({ onClick }) {
  return (
    <ButtonWrapper className="prev" onClick={onClick}>
      <LeftArrow />
    </ButtonWrapper>
  );
}

function NextArrow({ onClick }) {
  return (
    <ButtonWrapper className="next" onClick={onClick}>
      <RightArrow />
    </ButtonWrapper>
  );
}

export default function RecreationCarousel({ recreations, appendRecreation, incrementPage }) {
  const [carouselRef, carouselApi] = useCarousel();

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(carouselApi);

  useEffect(() => {
    incrementPage &&
      carouselApi &&
      carouselApi.on('slidesInView', () => {
        const lastSlide = carouselApi.slideNodes().length - 1;
        const isLastSlideInView = carouselApi.slidesInView().includes(lastSlide);

        if (isLastSlideInView) {
          incrementPage();
        }
      });
  }, [carouselApi]);

  return (
    <Carousel>
      <Viewport ref={carouselRef}>
        <Container>
          {recreations.map((recreation) => (
            <RecreationCard
              key={recreation.id}
              content={recreation}
              appendRecreation={appendRecreation}
            />
          ))}
        </Container>
        <PrevArrow onClick={onPrevButtonClick} />
        <NextArrow onClick={onNextButtonClick} />
      </Viewport>
    </Carousel>
  );
}

const Carousel = styled.section`
  width: 100%;
  position: relative;
`;

const Viewport = styled.div`
  overflow: hidden;
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 40%;

  &.next {
    right: 0;
  }

  &.prev {
    left: 0;
  }
`;
