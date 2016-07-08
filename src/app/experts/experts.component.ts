import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { RefirebasePipe } from '../shared/refirebase.pipe';

import { Expert } from '../shared/models';
import { AuthService } from '../shared/auth.service';

import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';

@Component({
    moduleId: module.id,
    selector: 'experts-list',
    template: `<h2>Experts</h2>
    <div style="clear:both;"></div>
    <div style="clear:both;" class="content">
        <button *ngIf="auth.isAdmin | async" md-raised-button color="primary" [routerLink]="['/developers']"><span class="adminIcon"></span>All Developers</button>
        <button *ngIf="auth.isUser | async" md-raised-button color="primary" (click)="router.navigate(['/profile'])">My Profile</button>
    </div>
    
    <md-card *ngFor="let expert of experts | async" class="pretty-card">
        <div style="display:flex;">
            <div style="flex-grow:1;">
            
                <md-card-title>{{ (expert.observable | async)?.name}}</md-card-title>
                <div>{{(expert.observable | async)?.webpage}}</div>
                <md-card-subtitle *ngIf="(expert.observable | async)?.twitterID">@{{(expert.observable | async)?.twitterID}}</md-card-subtitle>
                <div *ngIf="(expert.observable | async)?.communities">
                    <h4>Communities</h4>
                    <div *ngFor="let community of (expert.observable | async)?.communities | refirebase" >
                        <div>{{ (community | fireJoin:'/communities/' | async)?.name }}</div>
                    </div>
                </div>
            </div>
            <div>
                <div [style.background-image]="'url('+(expert.observable | async)?.picUrl+')'" *ngIf="(expert.observable | async)?.picUrl" class="background-side-picture"></div>
            </div>
            <div class="edit-button">
                <button *ngIf="auth.isAdmin | async" md-raised-button (click)="edit(expert)">Edit</button>
            </div>
        </div> 
    </md-card>
    
    `,
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [RefirebasePipe, FireJoinPipe],
    
})
export class ExpertsComponent {
    experts;
    auth;
    
    constructor(private router: Router, private expertService : FirebaseService<Expert>, private authService : AuthService, private af : AngularFire) {
        this.experts = af.database.list('/experts/').map(list => {
            console.log("processing a new list",list);
            list.forEach(item => {
                console.log("Processing a new expert",item);
                item.observable = af.database.object('/users/'+item.$key); 
            });
            return list;
        });
        
        // I need to convert from:
        // Observable<{key:boolean}[]> to Observable<Expert[]> 
        
        
        
        //this.experts = expertService.list;
        this.auth = authService;
    }
    
    edit(expert) {
        this.router.navigate(['/experts/',expert.$key,'/edit']);
    }
}