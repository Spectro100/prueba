import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private element: ElementRef) {}

   @HostListener('mouseenter') onMouseEnter(){
    this.highlight('#6676c3');
   }

   @HostListener('mouseleave') onMouseLeave(){
    this.highlight('');
   }

   highlight(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
