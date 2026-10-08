import { AfterViewInit, Directive, ElementRef, Input, OnDestroy } from '@angular/core';

/** Fades an element in when it scrolls into view. */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealDelay = 0;
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const node = this.el.nativeElement;
    node.style.transitionDelay = `${this.revealDelay}ms`;

    if (typeof IntersectionObserver === 'undefined') {
      node.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          node.classList.add('is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
