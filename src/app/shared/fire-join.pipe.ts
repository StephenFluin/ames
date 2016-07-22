import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from './firebase.service';

/**
 * Take a firebase key and do another lookup
 * Returns an observable of the object referred to by the key
 * 
 * example template expression:
 * {{ (community | fireJoin:'/communities/' | async)?.name }}
 */
@Pipe({ name: 'fireJoin' })
export class FireJoinPipe implements PipeTransform {
    constructor(private firebase: FirebaseService<any>) { }

    transform(value: any, destination: string): any {
        if (value && destination) {
            this.firebase.setup(destination);
            return this.firebase.list.map(list => list.find(item => item.$key == value));
        }
    }
}