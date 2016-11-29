import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Community } from '../shared/models';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { AuthService } from '../shared/auth.service';

/**
 * Render a view of a community here
 */
@Component({
    selector: 'community-view',
    templateUrl: './community-view.component.html',
})
export class CommunityViewComponent {
    community: Community;
    communityService: FirebaseTypedService<Community>;

    constructor(public route: ActivatedRoute, public fs: FirebaseService, title: Title, public auth: AuthService) {
        this.communityService = fs.attach<Community>('/communities/');

        // This calls .subscribe so we don't rely on the template for unrolling
        // the observable (which requires 2 components)
        route.params.subscribe(params =>
            this.communityService.get(params['id']).subscribe((community) => {
                this.community = community;
                title.setTitle(community.name);
            })
        );
    }
}
