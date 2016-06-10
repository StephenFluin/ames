import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { Mission } from '../models';
import { MissionService } from '../shared/mission.service';
import { Observable } from 'rxjs';

@Component({
    moduleId: module.id,
    template: `<h2>Edit <a [routerLink]="['/missions/',id]">{{ mission?.name }}</a></h2>
     <form *ngIf="mission" (submit)="save()">
        <label><input [(ngModel)]="mission.name" placeholder="name"></label>
        <label><textarea [(ngModel)]="mission.description" placeholder="description"></textarea></label>
       <!-- <div *ngIf="mission.startDate && mission.endDate">
            {{ mission.startDate}} - {{ mission.endDate}}
        </div>-->
        <button type="submit">save</button>
        <div style="font-size:10px;margin:32px 0">(<span style="color:red;" (click)="delete()">delete</span>)</div>
    </form>
    `,
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class MissionEditComponent {
    id : string;
    // Note that this doesn't match the detail component
    mission : Mission;
    
    constructor(private route : ActivatedRoute, private router: Router, private missionService : MissionService) {
        // Why is this an observable vs an object? :(
        route.params.subscribe(params => {
            this.id = params['id']; 
             missionService.getMission(this.id).subscribe(mission => {
                 this.mission = mission;
                 this.mission.$key = this.id;
                 
            });
        }, params => {
            console.log("error", params);
        }, () => {
            console.log("finished");
        });
    }
    
    save() {
        console.log("saving from component",this.mission);
        this.missionService.save(this.mission);
        this.router.navigate(['../../'], {relativeTo:this.route});
    }
    delete() {
        this.missionService.delete(this.mission);
        this.router.navigate(['../../'], {relativeTo:this.route});
        
        
    }
    
}