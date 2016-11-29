import { Component } from '@angular/core';
import { Community } from '../shared/models';

import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';

@Component({

    selector: 'community-edit',
    templateUrl: './community-edit.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class CommunityEditComponent {
    community: Observable<Community>;
    communityService: FirebaseTypedService<Community>;
    id: string;

    constructor(public route: ActivatedRoute, public router: Router, public fs: FirebaseService) {
        this.communityService = fs.attach<Community>('/communities/');
        this.community = route.params.switchMap(params => this.communityService.get(params['id']));
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
