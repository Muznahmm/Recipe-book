import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'charprofile'
})

export class CharProfilePipe implements PipeTransform {
    transform(value: string) {
        if (value) {
            return value[0].toUpperCase();
        }
        return value;
    }
}