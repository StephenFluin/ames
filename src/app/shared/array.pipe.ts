import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from './firebase.service';


/**
 * This pipe is a bit of a dirty hack to let me |async things and get a local variable with *ngFor
 */
@Pipe({name: 'array'})
export class ArrayPipe implements PipeTransform {
    constructor(private firebase : FirebaseService<any>) { }

    transform(value: any, destination: string ): any {
        if(value) {
            return [value];
        } else {
            return [];
        }
    }
}