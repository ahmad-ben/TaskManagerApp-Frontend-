import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { whiteSpaceValidator } from 'src/app/shared/functions/whiteSpaceValidator';

@Directive({
  selector: '[checkWhiteSpace]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: CheckWhiteSpaceDirective,
    multi: true
  }],
  standalone: true,
})

export class CheckWhiteSpaceDirective implements Validator {

  validate(control: AbstractControl): ValidationErrors | null {
    return whiteSpaceValidator()(control);
  }

}
