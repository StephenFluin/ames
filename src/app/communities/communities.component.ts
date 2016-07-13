import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { RefirebasePipe } from '../shared/refirebase.pipe';
import { FireJoinPipe } from '../shared/fire-join.pipe';

import { Community } from '../shared/models';

import { AuthService } from '../shared/auth.service';

import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    template: `<h2>Communities</h2>
    <p style="clear:both;">
        <button *ngIf="auth.isAdmin | async" md-raised-button color="primary" (click)="new()"><span class="adminIcon"></span>New Community</button>
        <button *ngIf="auth.isUser | async" md-raised-button color="primary" [routerLink]="['/communities/submit']">Submit Community</button>
    </p>
    
    <md-card *ngFor="let community of communities | async" class="pretty-card" [routerLink]="['/communities/',community.$key]">
        <md-card-title>{{community.icon}} {{community.name}}</md-card-title>
        <md-card-subtitle>{{community.location}}</md-card-subtitle>
 
        <div>Organizer:</div>
        <div>{{ (community.organizer | fireJoin:'/users/' | async)?.name}}</div>
        <div class="edit-button">
            <button *ngIf="(auth.isAdmin | async) || (auth.uid | async)==community.organizer" md-raised-button (click)="edit(community)">Edit</button>
        </div>

    </md-card>
    
    `,
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [FireJoinPipe, RefirebasePipe]
    
})
export class CommunitiesComponent {
    communities;
    auth;
    
    constructor(private router: Router, private communityService : FirebaseService<Community>, private authService : AuthService) {
        communityService.setup('/communities/', {query: {orderByChild: 'name'}});
        this.communities = communityService.list;
        this.auth = authService;
    }
    
    edit(community) {
        this.router.navigate(['/communities/',community.$key,'/edit']);
    }
    new() {
        this.router.navigate(['/communities/new/edit']);
    }
}