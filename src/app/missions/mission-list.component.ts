import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { MissionService } from '../shared/mission.service';
import { AuthService } from '../shared/auth.service';
import { Mission } from '../shared/models';
import { Observable } from 'rxjs';

@Component({
    moduleId: module.id,
    template: `<h2>List</h2>
    <div class="grid">
        <div *ngFor="let mission of list | async"><a [routerLink]="['/missions/',mission.$key]">{{mission.name}}</a></div>
    </div>
    <form *ngIf="auth.isAdmin" (submit)="createMission()">
        New Mission
        <input placeholder="name" [(ngModel)]="newMission.name"> 
        <button type="submit">Create</button>  
    </form>
    `,
    directives: [ROUTER_DIRECTIVES],
    
})
export class MissionListComponent implements OnInit {
    list : Observable<Mission[]>;
    newMission: Mission;
    constructor(private missionService : MissionService, private auth : AuthService, private route : ActivatedRoute, private router: Router) {
    }
    ngOnInit() {
        this.list = this.missionService.missions;
        this.newMission = new Mission();
    }
    createMission() {
        this.missionService.new(this.newMission);
        this.newMission = new Mission();
        
        // Take the user to their mission
        this.router.navigate(['./'], {relativeTo:this.route});
    }
    
}