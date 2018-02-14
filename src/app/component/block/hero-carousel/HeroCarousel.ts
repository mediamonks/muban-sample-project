import AbstractBlock from '../AbstractBlock';

export default class HeroCarousel extends AbstractBlock {
  static displayName: string = 'hero-carousel';

  constructor(el: HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}
