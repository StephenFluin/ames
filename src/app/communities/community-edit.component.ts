import { Component } from '@angular/core';
import { Community } from '../shared/models';

import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

@Component({

    selector: 'community-edit',
    templateUrl: 'community-edit.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class CommunityEditComponent {
    community: Observable<Community>;
    id: string;

    constructor(public route: ActivatedRoute, public router: Router, public communityService: FirebaseService<Community>) {
        communityService.setup('/communities/');
        this.community = route.params.flatMap(params => {
            if (params['id'] == "new") {
                console.log("returning an empty community.");
                return Observable.of(new Community);
            } else {
                console.log("Returning the get of this id.", params['id'], "from", communityService.endpoint);
                return communityService.get(params['id']);
            }
        });
    }

    processUpdate(item: Community) {
        this.communityService.save(item);
        this.router.navigate(['/communities']);
    }
    delete(item: Community) {
        this.communityService.delete(item);
        this.router.navigate(['/communities']);
    }
}
