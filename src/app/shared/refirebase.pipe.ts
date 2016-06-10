import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'refirebase'})
export class RefirebasePipe implements PipeTransform {
    transform(value: any, args?: any[]): any[] {
        if(value) {
            let keys = Object.keys(value),
                output = [];

            keys.forEach(key => {
                let arrayItem = value[key];
                if(key != "$key") {
                arrayItem.$key = key;
                output.push(arrayItem);
                }
            });
            return output;
        }
    }
}