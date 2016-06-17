import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseService } from './firebase.service';

import { Community } from './models';

@Pipe({name: 'communityLookup'})
export class CommunityLookupPipe implements PipeTransform {
    constructor(private communityService : FirebaseService<Community>) {
        
            communityService.setup('/communities/', Community);
    }

    transform(value: any, args?: any[]): any {
        if(value) {
            let communities = this.communityService.getList();
            return communities.map( list => list.find(community => community.$key == value));
        }
    }
}