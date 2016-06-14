import { Component } from '@angular/core';
import { Community } from '../shared/models';
import { CommunityFormComponent } from './community-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    selector: 'community-edit',
    template: `<community-form [community]="community | async"></community-form>
    `,
    providers: [],
    directives: [CommunityFormComponent],
    
})
export class CommunityEditComponent {
    community : Observable<Community>;
    id : string;
    
    constructor(private route : ActivatedRoute, private router: Router, private communityService : FirebaseService<Community>) {
        communityService.setup('/communities/', Community);
        route.params.subscribe(params => {
            this.id = params['id'];
            let communities = communityService.getList();
            this.community = communities.map( communityList => communityList.find(community => community.$key == this.id));
            
            
        }, params => {
            console.log("error", params);
        }, () => {
            console.log("finished");
        });
    }
}