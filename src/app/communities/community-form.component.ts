import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Community } from '../shared/models';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { PickerComponent } from '../shared/picker.component';

import { Expert } from '../shared/models';
import { FirebaseService } from '../shared/firebase.service';

import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'community-form',
    template: `<h2> <a [routerLink]="['/communities']">Communities</a> &gt; {{community?.name}}</h2>
    <form *ngIf="community" (submit)="save()" ngNoForm>
        <label>Name <input [(ngModel)]="community.name"></label>
        <label>Description <input [(ngModel)]="community.description"></label>
        <label>Location <input [(ngModel)]="community.location"></label>
        <label>Organizer 
        <select [(ngModel)]="community.organizer" (change)="change($event)">
            <option *ngFor="let expert of experts | async" [value]="expert.$key">{{expert.name}}</option>
        </select>
        {{community.organizer}}
        </label>
        <label>Span<input [(ngModel)]="community.span"></label>
        <label>URL<input [(ngModel)]="community.url"></label>
        <label>Type<input [(ngModel)]="community.type"></label>
        <button type="submit">Save</button>
        <button (click)="deleteCommunity()" type="button">DELETE</button>
    </form>
        `,
    styles: ['label input {display:block;margin-bottom:16px;}'],
    directives: [ ROUTER_DIRECTIVES, PickerComponent ],
    
})
export class CommunityFormComponent {
    @Output() update = new EventEmitter<Community>();
    @Output() delete = new EventEmitter<Community>();
    @Input() community : Community;
    
    
    experts : Observable<Expert[]>;
    
    constructor(private expertService : FirebaseService<Expert>, private af : AngularFire) {
        this.experts = this.af.database.list('/experts/', {query: {orderByChild: 'firstName'}});
    }
    ngOnInit() {}
   
    change(event) {
        console.log('communityorg change',event)
    }
    save() {
        event.preventDefault();
        this.update.emit(this.community);
        
    }
    deleteCommunity() {
        this.delete.emit(this.community);
    }
}