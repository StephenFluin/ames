import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { Mission } from '../shared/models';
import { FirebaseService } from '../shared/firebase.service';

import { FireJoinPipe } from '../shared/fire-join.pipe';
import { RefirebasePipe } from '../shared/refirebase.pipe';
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    template: `
    <div *ngIf="mission" >
        <h2>{{ mission.name}}</h2> 
        
        <a *ngIf="auth.isAdmin | async" [routerLink]="['/missions/',mission.$key,'/edit']">Edit</a>  
        
        <div class="content">
            <div *ngIf="mission.description">{{ mission.description}}</div>
            <div *ngIf="!mission.description"><em>No mission details are currently available.</em></div>
            <div *ngIf="mission.startDate && mission.endDate">
                {{ mission.startDate}} - {{ mission.endDate}}
            </div>
            <div>Organizer: {{(mission.organizer |  fireJoin:'/users/' | async)?.name }}</div>
            Participants:
            <div *ngFor="let developer of mission.participants | refirebase">
                {{(developer | fireJoin:'/users/' | async)?.name}}
            </div>
            
        </div>
    </div>
    `,
    directives: [ROUTER_DIRECTIVES],
    pipes: [FireJoinPipe, RefirebasePipe],

})
export class MissionDetailComponent {
    mission: Mission;

    constructor(private route: ActivatedRoute, private missionService: FirebaseService<Mission>, private auth: AuthService) {
        missionService.setup('/missions/');

        route.params.subscribe(params => {
            missionService.get(params['id'])
            .subscribe(next => {
                this.mission = next;
            });
        });
    }

}