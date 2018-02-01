export default class AbstractComponent {
  constructor(public element: HTMLElement) {
    console.log('Component', element);
  }

  dispose() {
    this.element = null;
  }
}
