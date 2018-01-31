import AbstractBlock from "../AbstractBlock";

export default class Hero extends AbstractBlock {
  static displayName:string = 'hero';

  constructor(el:HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}
