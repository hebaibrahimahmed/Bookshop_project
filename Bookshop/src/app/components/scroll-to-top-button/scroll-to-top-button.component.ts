import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrolltop',
  template: `
    <button class="scrolltop-button" *ngIf="showScrollButton" (click)="scrollToTop()">
      <i class="fas fa-chevron-up"></i>
    </button>
  `,
  styles: [],
})
export class ScrollToTopButtonComponent {
  @Input() bottom = '20px';
  @Input() background = '#333';
  @Input() fill = '#fff';
  @Input() size = '50px';
  @Input() sizeInner = 24;

  showScrollButton = false;

  ngOnInit() {
    window.addEventListener('scroll', this.handleScroll);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.showScrollButton = scrollTop >= 30;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
