import AbstractBlock from "../AbstractBlock";

export default class Footer extends AbstractBlock {
  static displayName:string = 'footer';

  constructor(el:HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}
