import { Component } from '@angular/core';
import { Community } from '../shared/models';
import { CommunityFormComponent } from './community-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    selector: 'community-edit',
    template: `<community-form [community]="community | async" (update)="processUpdate($event)" (delete)="delete($event)"></community-form>
    `,
    providers: [],
    directives: [CommunityFormComponent],
    
})
export class CommunityEditComponent {
    community : Observable<Community>;
    id : string;
    
    constructor(private route : ActivatedRoute, private router: Router, private communityService : FirebaseService<Community>) {
        communityService.setup('/communities/');
        this.community = route.params.flatMap( params => {
            if(params['id'] == "new") {
                return Observable.of(new Community);
            } else {
                return communityService.get(params['id']);
            }
        });
    }
    
    processUpdate(item : Community) {
        this.communityService.save(item);
        this.router.navigate(['/communities']);
    }
    delete(item : Community) {
        this.communityService.delete(item);
        this.router.navigate(['/communities']);
    }
}