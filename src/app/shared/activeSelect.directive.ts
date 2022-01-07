import { Directive, HostBinding, HostListener } from "@angular/core";
@Directive({
  selector: '[appActive]'
})
export class ActiveSelectDirective {
  @HostBinding('class.active') isClick = false;
  @HostListener('click') toggle() {
    this.isClick = !this.isClick;
  }
}
