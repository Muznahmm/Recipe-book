import { AbstractControl, ValidationErrors } from '@angular/forms';

export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        const value = control.value as string;

        if (value && (value.indexOf(' ') !== -1)) {
            return {
                cannotContainSpace: true,
            };
        }

        return null;
    }
}
