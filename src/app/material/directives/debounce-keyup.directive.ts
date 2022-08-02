import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { AbstractDebounceDirective } from "./abstract-debounce.directive";

@Directive({
  selector: "input[trimKeyUp]"
})
export class DebounceKeyupDirective extends AbstractDebounceDirective {

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef
  ) {
    super(renderer, elementRef, 500, 'N');
  }

  @HostListener("keyup", ["$event"])
  public onKeyUp(event: any): void {
    event.preventDefault();
    this.emitEvent$.next(event);
  }

}