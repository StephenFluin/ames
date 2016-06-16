import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { Expert } from '../shared/models';

import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    selector: 'experts-list',
    template: `<h2>Experts</h2>
    <p style="clear:both;">
        <button md-raised-button color="primary" (click)="new()">New</button>
    </p>
    <md-card *ngFor="let expert of experts | async" style="margin:16px;width:300px;float:left;height:200px;">
        <div style="display:flex;">
            <div style="flex-grow:1;">
            
                <md-card-title>{{expert.firstName}} {{expert.lastName}}</md-card-title>
                <div>{{expert.webpage}}</div>
                <md-card-subtitle *ngIf="expert.twitterID">@{{expert.twitterID}}</md-card-subtitle>
            </div>
            <div style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
                <div [style.background-image]="'url('+expert.picUrl+')'" *ngIf="expert.picUrl" class="background-side-picture"></div>
                <button *ngIf="auth.isAdmin" md-raised-button (click)="edit(expert)">Edit</button>
            </div>
        </div> 
    </md-card>
    
    `,
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
    
})
export class ExpertsComponent {
    experts;
    auth;
    
    constructor(private router: Router, private expertService : FirebaseService<Expert>) {
        expertService.setup('/experts/', Expert);
        this.experts = expertService.getList();
        this.experts.subscribe(next => console.log(next), error => console.log(error), () => console.log('finished'));
        this.auth = {isAdmin: true};
    }
    
    edit(expert) {
        this.router.navigate(['/experts/',expert.$key,'/edit']);
    }
    
    new() {
        this.router.navigate(['/experts/new/edit']);
    }
}