import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { RefirebasePipe } from '../shared/refirebase.pipe';

import { Event } from '../shared/models';
import { AuthService } from '../shared/auth.service';

import { FirebaseService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';

@Component({
    moduleId: module.id,
    selector: 'events-list',
    template: `<h2>Events</h2>
    <div style="clear:both;"></div>
    <div style="clear:both;" class="content">
        <button *ngIf="auth.isAdmin | async" md-raised-button color="primary" (click)="new()">New Event</button>
        <button *ngIf="auth.isUser | async" md-raised-button color="primary" (click)="router.navigate(['/profile'])">My Profile</button>
    </div>
    
    <md-card *ngFor="let event of events | async" class="pretty-card">
        <div style="display:flex;">
            <div style="flex-grow:1;">
            
                <md-card-title>{{event.name}}</md-card-title>
                <div>{{event.webpage}}</div>
                <md-card-subtitle *ngIf="event.twitterID">@{{event.twitterID}}</md-card-subtitle>
                <div *ngIf="event.communities">
                    <h4>Communities</h4>
                    <div *ngFor="let community of event.communities | refirebase" >
                        <div>{{ (community | fireJoin:'/communities/' | async)?.name }}</div>
                    </div>
                </div>
            </div>
            <div>
                <div [style.background-image]="'url('+event.picUrl+')'" *ngIf="event.picUrl" class="background-side-picture"></div>
            </div>
            <div class="edit-button">
                <button *ngIf="auth.isAdmin | async" md-raised-button (click)="edit(event)">Edit</button>
            </div>
        </div> 
    </md-card>
    
    `,
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES],
    pipes: [RefirebasePipe, FireJoinPipe],
    
})
export class EventsComponent {
    events;
    auth;
    
    constructor(private router: Router, private eventService : FirebaseService<Event>, private authService : AuthService) {
        
        eventService.setup('/events/', {query: {orderByChild: 'firstName'}});
        this.events = eventService.list;
        this.auth = authService;
    }
    
    edit(event) {
        this.router.navigate(['/events/',event.$key,'/edit']);
    }
    
    new() {
        this.router.navigate(['/events/new/edit']);
    }
}