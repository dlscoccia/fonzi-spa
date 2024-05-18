import { Directive, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';

/* eslint-disable @angular-eslint/directive-selector */
@Directive({
  selector: 'form',
})
export class MensajeErrorCamposSubmitDirective {
  public submit;

  constructor(private host: ElementRef<HTMLFormElement>) {
    this.submit = fromEvent(this.element, 'submit').pipe(
      tap(() => {
        if (this.element.classList.contains('submitted') === false) {
          this.element.classList.add('submitted');
        }
      }),
      shareReplay(1),
    );
  }

  get element() {
    return this.host.nativeElement;
  }
}

