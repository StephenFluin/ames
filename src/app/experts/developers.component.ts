import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
    selector: 'developers-list',
    template: `
    <div *ngIf="auth.isAdmin | async">
        <h2><span class="adminIcon"></span>All Developers</h2>
        <div style="clear:both;"></div>
        
        <md-card *ngFor="let expert of experts | async" class="pretty-card" [routerLink]="['/experts/',expert.$key]">
            <div style="display:flex;">
                <div style="flex-grow:1;">
                
                    <md-card-title>{{ expert.name}}</md-card-title>
                    <div>{{exwebpage}}</div>
                    <md-card-subtitle *ngIf="expert.twitterID">@{{expert.twitterID}}</md-card-subtitle>
                    <div *ngIf="expert.communities">
                        <h4>Communities</h4>
                        <div *ngFor="let community of expert.communities | refirebase" >
                            <div>{{ (community | fireJoin:'/communities/' | async)?.name }}</div>
                        </div>
                    </div>
                </div>
                <div>
                    <div [style.background-image]="'url('+expert.picUrl+')'" *ngIf="expert.picUrl" class="background-side-picture"></div>
                </div>
                <div class="edit-button">
                    <button *ngIf="auth.isAdmin | async" md-raised-button (click)="edit(expert)">Edit</button>
                </div>
            </div> 
        </md-card>
    </div>
    `,
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
    pipes: [RefirebasePipe, FireJoinPipe],

})
export class DevelopersComponent {
    experts;
    auth;

    constructor(private router: Router, private expertService: FirebaseService<Expert>, private authService: AuthService, private af: AngularFire) {
        this.experts = af.database.list('/users/');

        this.auth = authService;
    }

    edit(expert) {
        this.router.navigate(['/experts/', expert.$key, '/edit']);
    }
}