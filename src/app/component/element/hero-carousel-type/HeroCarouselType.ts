import AbstractBlock from "app/component/block/AbstractBlock";

export default class HeroCarouselType extends AbstractBlock {
  static displayName:string = 'hero-carousel-type';

  constructor(el:HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}
