import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Mission } from '../shared/models';
import { MissionService } from '../shared/mission.service';
import { Observable } from 'rxjs';

@Component({
    moduleId: module.id,
    template: `<h2>{{ (mission | async)?.name}}</h2>
    <a [routerLink]="['/missions/',id,'/edit']">Edit</a>
    <div class="content">
        <div *ngIf="(mission | async)?.description">{{ (mission | async)?.description}}</div>
        <div *ngIf="(mission | async)?.startDate && (mission | async)?.endDate">
            {{ (mission | async)?.startDate}} - {{ (mission | async)?.endDate}}
        </div>
    </div>
    `,
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class MissionDetailComponent {
    id : string;
    // Should this be an observable or a real mission? I kind of want to remove it from the observable to make template cleaner
    mission : Observable<Mission>;
    
    constructor(private route : ActivatedRoute, private missionService : MissionService) {
        // Why is this an observable vs an object? :(
        route.params.subscribe(params => {
            this.id = params['id']; 
            this.mission = missionService.getMission(this.id);
        }, params => {
            console.log("error", params);
        }, () => {
            console.log("finished");
        });
    }
    
}