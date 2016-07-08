import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { RefirebasePipe } from '../shared/refirebase.pipe';

import { Expert } from '../shared/models';
import { AuthService } from '../shared/auth.service';

import { FirebaseService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';

@Component({
    moduleId: module.id,
    selector: 'experts-list',
    template: `<h2>Experts</h2>
    <div style="clear:both;"></div>
    <div style="clear:both;" class="content">
        <button *ngIf="auth.isAdmin | async" md-raised-button color="primary" (click)="new()"><span class="adminIcon"></span>New Expert</button>
        <button *ngIf="auth.isUser | async" md-raised-button color="primary" (click)="router.navigate(['/profile'])">My Profile</button>
    </div>
    
    <md-card *ngFor="let expert of experts | async" class="pretty-card">
        <div style="display:flex;">
            <div style="flex-grow:1;">
            
                <md-card-title>{{expert.name}}</md-card-title>
                <div>{{expert.webpage}}</div>
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
    
    `,
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
    pipes: [RefirebasePipe, FireJoinPipe],
    
})
export class ExpertsComponent {
    experts;
    auth;
    
    constructor(private router: Router, private expertService : FirebaseService<Expert>, private authService : AuthService) {
        
        expertService.setup('/experts/', {query: {orderByChild: 'firstName'}});
        this.experts = expertService.list;
        this.auth = authService;
    }
    
    edit(expert) {
        this.router.navigate(['/experts/',expert.$key,'/edit']);
    }
    
    new() {
        this.router.navigate(['/experts/new/edit']);
    }
}