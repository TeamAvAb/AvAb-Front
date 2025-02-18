import { useCallback, useEffect, useState } from 'react';

export const usePrevNextButtons = (api) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!api) {
      return;
    }
    api.scrollPrev();
  }, [api]);

  const onNextButtonClick = useCallback(() => {
    if (!api) {
      return;
    }
    api.scrollNext();
  }, [api]);

  const onSelect = useCallback((api) => {
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on('reInit', onSelect).on('select', onSelect);
  }, [api, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
