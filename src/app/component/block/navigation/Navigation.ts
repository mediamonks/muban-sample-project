import AbstractBlock from "../AbstractBlock";

export default class Navigation extends AbstractBlock {
  static displayName:string = 'navigation';

  constructor(el:HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}
