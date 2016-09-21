import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { Community } from '../shared/models';
import { FirebaseService } from '../shared/firebase.service';
import { AuthService } from '../shared/auth.service';

/**
 * Render a view of a community here
 */
@Component({

    selector: 'community-view',
    templateUrl: 'community-view.component.html',
})
export class CommunityViewComponent {
    community: Community;

    constructor(public route: ActivatedRoute, public communityService: FirebaseService<Community>, title: Title, public auth: AuthService) {
        communityService.setup('/communities/');

        // This calls .subscribe so we don't rely on the template for unrolling
        // the observable (which requires 2 components)
        route.params.subscribe(params =>
            communityService.get(params['id']).subscribe((community) => {
                this.community = community;
                title.setTitle(community.name);
            })
        );
    }
}
