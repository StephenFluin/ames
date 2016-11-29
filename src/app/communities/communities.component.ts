import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Community } from '../shared/models';
import { AuthService } from '../shared/auth.service';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';

@Component({
    templateUrl: './communities.component.html',
    styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent {
    communities;
    auth;
    communityService: FirebaseTypedService<Community>;

    constructor(public router: Router, public fs: FirebaseService, public authService: AuthService) {
        this.communityService = fs.attach<Community>('/communities/', { query: { orderByChild: 'name' } });
        this.communities = this.communityService.list;
        this.auth = authService;
    }

    edit(community) {
        this.router.navigate(['/communities', community.$key, 'edit']);
    }
    new() {
        this.router.navigate(['/communities/new/edit']);
    }
}
