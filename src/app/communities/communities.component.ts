import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from '../shared/models';
import { AuthService } from '../shared/auth.service';
import { FirebaseService } from '../shared/firebase.service';

@Component({
    templateUrl: 'communities.component.html',
    styleUrls: ['communities.component.scss'],
})
export class CommunitiesComponent {
    communities;
    auth;

    constructor(public router: Router, public communityService: FirebaseService<Community>, public authService: AuthService) {
        communityService.setup('/communities/', { query: { orderByChild: 'name' } });
        this.communities = communityService.list;
        this.auth = authService;
    }

    edit(community) {
        this.router.navigate(['/communities', community.$key, 'edit']);
    }
    new() {
        this.router.navigate(['/communities/new/edit']);
    }
}
