import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function whiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors|null => {

    if(control.value == '') return null;
    return (control.value || '').trim().length? null : { 'whiteSpace': true };

  }
}
