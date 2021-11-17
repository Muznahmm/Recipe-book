import { AbstractControl } from "@angular/forms";

export abstract class FormCanDeactivate {
    abstract get formRef(): AbstractControl;

    canDeactivate(): boolean {
        return !this.formRef.dirty;
    }
}
