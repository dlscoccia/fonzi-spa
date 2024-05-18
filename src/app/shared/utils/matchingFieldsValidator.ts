import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchingFieldsValidator: ValidatorFn = (
  control: FormGroup
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { noMatch: true };
  }
  return null;
};
