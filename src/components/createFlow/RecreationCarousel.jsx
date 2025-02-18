import styled from 'styled-components';
import useEmblaCarousel from 'embla-carousel-react';
import RightArrow from '../common/button/RightArrow';
import LeftArrow from '../common/button/LeftArrow';
import { usePrevNextButtons } from '../../hooks/usePrevNextButtons';
import RecreationCard from './RecreationCard';

function PrevArrow({ onClick }) {
  return (
    <ButtonWrapper className="prev" onClick={onClick}>
      <LeftArrow />
    </ButtonWrapper>
  );
}

function NextArrow({ className, onClick }) {
  return (
    <ButtonWrapper onClick={onClick}>
      <RightArrow />
    </ButtonWrapper>
  );
}

export default function RecreationCarousel({ recreations, handleAddRecommendFlow }) {
  const [carouselRef, carouselApi] = useEmblaCarousel({
    slidesToScroll: 2,
    duration: 30,
    watchDrag: false,
  });

  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(carouselApi);

  return (
    <Carousel>
      <Viewport ref={carouselRef}>
        <Container>
          {recreations.map((recreation) => (
            <RecreationCard content={recreation} />
          ))}
        </Container>
      </Viewport>
      <PrevArrow onClick={onPrevButtonClick} />
      <NextArrow onClick={onNextButtonClick} />
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
  right: 0;

  &.prev {
    left: 0;
  }
`;
