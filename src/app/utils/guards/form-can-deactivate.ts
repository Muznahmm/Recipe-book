import { AbstractControl, NgForm } from '@angular/forms';

export abstract class FormCanDeactivate {

  abstract get formRef(): AbstractControl | NgForm;

  canDeactivate(): boolean {
    return !this.formRef.dirty;
  }
}