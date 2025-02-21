import useEmblaCarousel from 'embla-carousel-react';

export default function useCarousel() {
  return useEmblaCarousel({
    slidesToScroll: 2,
    duration: 30,
    watchDrag: false,
    watchSlides: (emblaApi) => {
      const reloadEmbla = () => {
        const oldEngine = emblaApi.internalEngine();

        emblaApi.reInit();
        const newEngine = emblaApi.internalEngine();
        const copyEngineModules = [
          'scrollBody',
          'location',
          'offsetLocation',
          'previousLocation',
          'target',
        ];
        copyEngineModules.forEach((engineModule) => {
          Object.assign(newEngine[engineModule], oldEngine[engineModule]);
        });

        newEngine.translate.to(oldEngine.location.get());
        const { index } = newEngine.scrollTarget.byDistance(0, false);
        newEngine.index.set(index);
        newEngine.animation.start();
      };

      const reloadAfterPointerUp = () => {
        emblaApi.off('pointerUp', reloadAfterPointerUp);
        reloadEmbla();
      };

      const engine = emblaApi.internalEngine();

      if (engine.dragHandler.pointerDown()) {
        const boundsActive = engine.limit.reachedMax(engine.target.get());
        engine.scrollBounds.toggleActive(boundsActive);
        emblaApi.on('pointerUp', reloadAfterPointerUp);
      } else {
        reloadEmbla();
      }
    },
  });
}
