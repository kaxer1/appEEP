import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { AbstractDebounceDirective } from "./abstract-debounce.directive";

@Directive({
  selector: "input[mayusculas]"
})
export class DebounceMayusculasDirective extends AbstractDebounceDirective {

  constructor(
    public renderer: Renderer2,
    public elementRef: ElementRef
  ) {
    super(renderer, elementRef, 300, 'M');
  }

  @HostListener("keyup", ["$event"])
  public onKeyUp(event: any): void {
    event.target.value = event.target.value.toUpperCase();
    event.preventDefault();
    this.emitEvent$.next(event);
  }

}