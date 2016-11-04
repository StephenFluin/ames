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
    constructor(private fs: FirebaseService) { }

    transform(value: any, destination: string): any {
        if (value && destination) {
            let service = this.fs.attach<any>(destination);
            return service.list.map(list => list.find(item => item.$key == value));
        }
    }
}