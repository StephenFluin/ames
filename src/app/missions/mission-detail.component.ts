import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Mission } from '../shared/models';
import { FirebaseService } from '../shared/firebase.service';
import { Observable } from 'rxjs/Rx';

@Component({
    moduleId: module.id,
    template: `
    <div *ngIf="mission" >
        <h2>{{ (mission | async)?.name}}</h2> 
        
        <a *ngIf="id" [routerLink]="['/missions/',id,'/edit']">Edit</a>  
        
        <div class="content">
            <div *ngIf="(mission | async)?.description">{{ (mission | async)?.description}}</div>
            <div *ngIf="(mission | async)?.startDate && (mission | async)?.endDate">
                {{ (mission | async)?.startDate}} - {{ (mission | async)?.endDate}}
            </div>
        </div>
    </div>
    `,
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class MissionDetailComponent {
    id : string;
    // Should this be an observable or a real mission? I kind of want to remove it from the observable to make template cleaner
    mission : Observable<Mission>;
    
    constructor(private route : ActivatedRoute, private missionService : FirebaseService<Mission>) {
        missionService.setup('/missions/');
        
        this.mission = route.params.flatMap( params => {
            return missionService.get(params['id'] )
        });
        console.log("where is my id?");
        route.params.subscribe(next => this.id=next['id'], error => console.error(error), () => console.log('finished'));
    }
    
}