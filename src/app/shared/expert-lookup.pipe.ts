import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from './firebase.service';

import { Expert } from './models';

@Pipe({name: 'expertLookup'})
export class ExpertLookupPipe implements PipeTransform {
    constructor(private expertService : FirebaseService<Expert>) {
        
            expertService.setup('/experts/', Expert);
    }

    transform(value: any, args?: any[]): any {
        if(value) {
            let communities = this.expertService.getList();
            return communities.map( list => list.find(item => item.$key == value));
        }
    }
}