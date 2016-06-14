import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Community } from '../shared/models';

import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    template: `<h2>Communities</h2>
    
    <div *ngFor="let community of communities | async" class="card">
        <section>
            <div>{{community.icon}}</div>
            <div><strong>{{community.name}}</strong></div>
            <div>{{community.location}}</div>
        </section>
        <section>
            <div>Organizer:</div>
            <div>{{ community.organizer}}</div>
        </section>
        <section>
            <div>Members:</div>
        </section>
        <section *ngIf="auth.isAdmin">
            <button md-button-raised (click)="edit(community)">Edit</button>
        </section>
    </div>
    
    `,
    
})
export class CommunitiesComponent {
    communities;
    auth;
    
    constructor(private router: Router, private communityService : FirebaseService<Community>) {
        communityService.setup('/communities/', Community);
        this.communities = communityService.getList();
        this.communities.subscribe(next => console.log(next), error => console.log(error), () => console.log('finished'));
        this.auth = {isAdmin: true};
    }
    
    edit(community) {
        this.router.navigate(['/communities/',community.$key,'/edit']);
    }
}