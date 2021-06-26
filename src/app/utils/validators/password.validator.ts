import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface strongPasswordErrors {
    shouldBeStrong: {
        requiredLength?: number;
        actualLength?: number;
        maxLength?: number;
        requireSpecialCharacter?: boolean;
        requiredUpperCaseCharacter?: boolean;
        requiredLowerCaseCharacter?: boolean;
        requiredNumericalCharacter?: boolean;
    }
}

export class PasswordValidators {
    static shouldBeStrong(minLength: number, maxLength?: number): ValidatorFn {
        //validator fn is a signature of return function here
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value as string;
            if(!value) {
                return null;
            }
            if (value.length < minLength) { // This method is similar to the method we are using in Validator.minLength
                return {
                    shouldBeStrong: {
                        requiredLength: minLength, 
                        actualLength: value.length,
                    },
                };
            }

            if (maxLength && (value.length > maxLength)) {
                return {
                    shouldBeStrong: {
                        maxLength,
                        actualLength: value.length,
                    },
                };
            }

            // const SPECIAL_REGEXP = /[^[A-Za-z0-9]]/g;
            // if (!SPECIAL_REGEXP.test(value)) {
            //     return {
            //         shouldBeStrong: {
            //             requireSpecialCharecter: true,
            //         }
            //     }
            // }

            const SPECIAL_CHARACTER_REGEXP = /[^A-Za-z0-9]/g;
            if (!SPECIAL_CHARACTER_REGEXP.test(value)) {
                return {
                shouldBeStrong: {
                    requireSpecialCharacter: true,
                },
                };
            }

            const UPPERCASE_REGEXP = /[^A-Z]/g;
            if (!UPPERCASE_REGEXP.test(value)) {
                return {
                    shouldBeStrong: {
                        requiredUpperCaseCharacter: true,
                    }
                }
            }

            const LOWERCASE_REGEXP = /[^a-z]/g;
            if (!LOWERCASE_REGEXP.test(value)) {
                return {
                    shouldBeStrong: {
                        requiredLowerCaseCharacter: true,
                    }
                }
            }

            const NUMBER_REGEXP = /[^A_Z]/g;
            if (!NUMBER_REGEXP.test(value)) {
                return {
                    shouldBeStrong: {
                        requiredNumricalCharacter: true,
                    }
                }
            }

            return null;
        }
    }

    static shouldMatch(passwordMatch: string): ValidatorFn {
        return (control: AbstractControl) => {
            const value = control.value as string;
            if (!value) {
                return null;
            }
            if (value !== passwordMatch) {
                return {
                    shouldMatch: {
                        original: passwordMatch,
                        current: value,
                    }
                }
            }
            return null;
        }
    }
}
