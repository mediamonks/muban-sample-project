import AbstractBlock from "../AbstractBlock";

export default class IntroContent extends AbstractBlock {
  static displayName:string = 'intro-content';

  constructor(el:HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}
