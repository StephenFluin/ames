import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    template: `Communities!
    
    <div *ngFor="let community of communities" class="card">
        <section>
            <div>{{community.icon}}</div>
            <div>{{community.name}}</div>
            <div>{{community.city}}, {{community.state}}</div>
        </section>
        <section>
            <div>Organizer</div>
            <div>{{ (community.organizer)?.name}}</div>
        </section>
        <section>
            <div>Members</div>
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
    
    constructor() {
        this.communities = 
        [
            {
                icon: "people",
                name: "City Angular Meetup",
                city: "San Jose",
                state: "CA",
                organizer: "aaronfrost",
                members: ["aaronfrost"]
            },
            {
                icon: "message",
                name: "Angular Community",
                city: "San Jose",
                state: "CA",
                organizer: "aaronfrost",
                members: ["aaronfrost"]
            },
            {
                icon: "message",
                name: "Angular Gitter",
                city: "San Jose",
                state: "CA",
                organizer: "johnpapa",
                members: ["aaronfrost", "johnpapa"]
            },
        ];
        
        this.auth = {isAdmin: true};
    }
    
    edit(community) {
        
    }
}