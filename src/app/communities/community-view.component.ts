import { Component } from '@angular/core';
import { Community } from '../shared/models';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

/**
 * Render a view of a community here
 */
@Component({
    moduleId: module.id,
    selector: 'community-view',
    template: `
    <div *ngIf="community">
        <h2>{{community.name }}</h2>
        <p>{{community.description}}</p>
        <p><strong>Location:</strong> {{community.location}}</p>
        <p><strong>Organizer:</strong> {{ (community.organizer | fireJoin:'/users/' | async)?.name}}</p>
        <p><a [href]="community.url">{{community.url}}</a></p>
        <p>Members:</p>
        <div *ngFor="let developer of community.members | refirebase" class="content" style="display:flex;align-items:center">
            <img class="shield" *ngIf="(developer | fireJoin:'/users/' | async)?.picUrl" [src]="(developer | fireJoin:'/users/' | async)?.picUrl" /> 
            {{(developer | fireJoin:'/users/' | async)?.name}}
        </div>
    </div>
    <div *ngIf="!community">
        <p>Community not found.</p>
    </div>
    `,
})
export class CommunityViewComponent {
    community: Community;

    constructor(public route: ActivatedRoute, public communityService: FirebaseService<Community>) {
        communityService.setup('/communities/');

        // This calls .subscribe so we don't rely on the template for unrolling 
        // the observable (which requires 2 components)
        route.params.subscribe(params =>
            communityService.get(params['id']).subscribe((community) => {
                this.community = community;
            })
        );
    }
}