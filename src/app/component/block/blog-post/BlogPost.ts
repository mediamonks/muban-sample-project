import AbstractBlock from "../AbstractBlock";

export default class BlogPost extends AbstractBlock {
  static displayName:string = 'blog-post';

  constructor(el:HTMLElement) {
    super(el);
  }

  public dispose() {
    super.dispose();
  }
}
