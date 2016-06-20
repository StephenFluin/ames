import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { RefirebasePipe } from '../shared/refirebase.pipe';
import { FireJoinPipe } from '../shared/fire-join.pipe';

import { Community } from '../shared/models';

import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    template: `<h2>Communities</h2>
    <p style="clear:both;">
        <button md-raised-button color="primary" (click)="new()">New</button>
    </p>
    
    <md-card *ngFor="let community of communities | async" class="pretty-card">
        <md-card-title>{{community.icon}} {{community.name}}</md-card-title>
        <md-card-subtitle>{{community.location}}</md-card-subtitle>
 
        <div>Organizer:</div>
        <div>{{ (community.organizer | fireJoin:'/experts/' | async)?.firstName}} {{ (community.organizer | fireJoin:'/experts/' | async)?.lastName}}</div>
        <div class="edit-button">
            <button *ngIf="auth.isAdmin" md-raised-button (click)="edit(community)">Edit</button>
        </div>

    </md-card>
    
    `,
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
    pipes: [FireJoinPipe, RefirebasePipe]
    
})
export class CommunitiesComponent {
    communities;
    auth;
    
    constructor(private router: Router, private communityService : FirebaseService<Community>) {
        communityService.setup('/communities/', {query: {orderByChild: 'name'}});
        this.communities = communityService.list;
        this.auth = {isAdmin: true};
    }
    
    edit(community) {
        this.router.navigate(['/communities/',community.$key,'/edit']);
    }
    new() {
        this.router.navigate(['/communities/new/edit']);
    }
}