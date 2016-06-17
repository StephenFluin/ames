import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Pipe({name: 'fireJoin'})
export class FireJoinPipe implements PipeTransform {
    constructor(private firebase : FirebaseService<any>) { }

    transform(value: any, destination: string ): any {
        if(value && destination) {
            this.firebase.setup(destination);
            return this.firebase.list.map( list => list.find(item => item.$key == value));
        }
    }
}