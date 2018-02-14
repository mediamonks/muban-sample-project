import AbstractBlock from 'app/component/block/AbstractBlock';
import { TweenMax, Expo } from 'gsap';
import Draggable from 'gsap/Draggable';

export default class HeroCarouselType extends AbstractBlock {
  static displayName: string = 'hero-carousel-type';

  private _carousel: HTMLElement;
  private _carouselItems: Array<Element>;
  private _draggable: Draggable;
  private _bullets: HTMLElement;
  private _currentItem: number = 0;
  private _newItem: number = 0;
  private _realIndex: number = 0;
  private _previousItem: number = 0;

  private _nextButton: HTMLElement;
  private _previousButton: HTMLElement;

  private _isDragging: boolean;
  private _items: Array<HTMLElement> = [];

  constructor(el: HTMLElement) {
    super(el);

    this._carousel = <HTMLElement>el.querySelector('.js-hero-carousel');
    this._carouselItems = <Array<HTMLElement>>Array.from(
      el.querySelectorAll('.js-hero-carousel-item'),
    );

    // init at the next tick
    setTimeout(() => {
      this.setEvents();
      this.init();
    }, 500);
  }

  private setEvents(): void {
    if (this._carouselItems.length > 1) {
      this._nextButton = <HTMLElement>this.element.querySelector('.js-next');
      if (this._nextButton) {
        this._nextButton.addEventListener('click', this.handleArrowClick.bind(this, 'next'));
      }

      this._previousButton = <HTMLElement>this.element.querySelector('.js-previous');
      if (this._previousButton) {
        this._previousButton.addEventListener(
          'click',
          this.handleArrowClick.bind(this, 'previous'),
        );
      }
    }
  }

  private init(): void {
    if (this._carouselItems.length > 1) {
      this.setItems();
      this.createDraggable();
      this.createBullets();
      this.updateUIStatus();
    }
  }

  private setItems(): void {
    this._items.length = 0;

    this._carouselItems.forEach((element, index) => {
      const position = index * 100;

      this._items.push(<HTMLElement>element);
      TweenMax.set(element, { x: position + '%' });
    });
  }

  private handleArrowClick = (direction: string): void => {
    if (this._carouselItems.length > 1) {
      this._newItem = direction === 'next' ? this._newItem + 1 : this._newItem - 1;
      this.handleItemChange();
    }
  };

  private goToItem = (index: number): void => {
    this._newItem = index;
    this.handleItemChange();
  };

  private createDraggable(): void {
    this._draggable = Draggable.create(this._carousel, {
      type: 'x',
      bounds: this._carousel,
      zIndexBoost: false,
      dragClickables: true,
      dragResistance: 0,
      edgeResistance: 0,
      throwResistance: 2500,
      minimumMovement: 6,
      cursor: 'grabbing',
      onDragStart: this.handleDragStart,
      onDrag: this.handleDrag,
      onDragEnd: this.handleDragEnd,
    })[0];
  }

  private handleDragStart = (): void => {
    this._isDragging = true;
  };

  private handleDrag = () => {
    const elementWidth = this.element.offsetWidth;
    const currentX = this._newItem * elementWidth;

    this._currentItem =
      this._draggable.x + currentX < currentX ? this._newItem + 1 : this._newItem - 1;

    this.checkItemReposition();
  };

  private handleDragEnd = (): void => {
    this._isDragging = false;

    const elementWidth = this.element.offsetWidth;
    const currentX = this._newItem * elementWidth;

    if (this._draggable.x > -elementWidth / 8 && this._draggable.x < elementWidth / 8) {
      this.setCarouselPosition();
      return;
    }

    if (this._draggable.x + currentX < currentX) {
      this._newItem = this._newItem + 1;
      this.handleItemChange();
    } else {
      this._newItem = this._newItem - 1;
      this.handleItemChange();
    }
  };

  private setCarouselPosition(): void {
    TweenMax.to(this._carousel, 1, {
      x: Math.round(this._newItem * 100 * -1) + '%',
      ease: Expo.easeOut,
    });

    this._previousItem = this._newItem;
    this._currentItem = this._newItem;
  }

  private handleItemChange(): void {
    if (!this._isDragging) {
      this._currentItem = this._newItem;

      this.updateUIStatus();
      this.checkItemReposition();
      this.setCarouselPosition();
    }
  }

  private checkItemReposition(): void {
    const position: number = this._currentItem * 100;
    const numItems: number = this._carouselItems.length;
    const nextElementKey = (this.getCurrentIndex() + numItems) % numItems;

    const nextItem: HTMLElement = this._items[nextElementKey];
    TweenMax.set(nextItem, { x: position + '%' });
  }

  private getCurrentIndex(): number {
    let item = this._currentItem;
    const numItems = this._carouselItems.length;
    while (item < 0) {
      item += numItems;
    }

    return item % numItems;
  }

  // UPDATE UI
  private updateUIStatus(): void {
    this._realIndex = this.getCurrentIndex();

    if (this._bullets) {
      const bullets = Array.prototype.slice.call(this._bullets.querySelectorAll('.js-button'));

      bullets.forEach((bullet, index) => {
        if (index === this._realIndex) {
          bullet.classList.add('is-active');
        } else {
          bullet.classList.remove('is-active');
        }
      });
    }
  }

  // CREATE NAVIGATION BULLETS
  private createBullets(): void {
    this._bullets = <HTMLElement>this.element.querySelector('.js-bullets');
    if (this._bullets) {
      this._bullets.innerHTML = '';

      for (let i = 0; i < this._carouselItems.length; i++) {
        const button = document.createElement('button');
        button.classList.add('bullet-button');
        button.classList.add('js-button');
        button.addEventListener('click', this.goToItem.bind(this, i));

        const li = document.createElement('li');
        li.classList.add('bullet-item');
        li.appendChild(button);

        this._bullets.appendChild(li);
      }
    }
  }

  public dispose() {
    super.dispose();
  }
}
