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
    template: `
    <form *ngIf="community" (submit)="save()" ngNoForm>
        <label>Name <input [(ngModel)]="community.name"></label>
        <label>Description <input [(ngModel)]="community.description"></label>
        <label>Location <input [(ngModel)]="community.location"></label>
        <label>Organizer 
        <select [(ngModel)]="community.organizer" (change)="change($event)">
            <option *ngFor="let developer of developers | async" [value]="developer.$key">{{developer.name}}</option>
        </select>
        {{community.organizer}}
        </label>
        <label>URL<input [(ngModel)]="community.url"></label>
        
        <div class="options">
            <span (click)="deleteThis()" class="delete">delete</span>
            <button md-raised-button color="primary" type="submit" >Save</button>
        </div>
    </form>
        `,
    styles: ['label input {display:block;margin-bottom:16px;}'],
    directives: [ ROUTER_DIRECTIVES, PickerComponent ],
    
})
export class CommunityFormComponent {
    @Output() update = new EventEmitter<Community>();
    @Output() delete = new EventEmitter<Community>();
    @Input() community : Community;
    
    
    developers : Observable<Expert[]>;
    
    constructor(private expertService : FirebaseService<Expert>, private af : AngularFire) {
        this.developers = this.af.database.list('/users/', {query: {orderByChild: 'name'}});
    }
    ngOnInit() {}
   
    change(event) {
        console.log('communityorg change',event)
    }
    save() {
        event.preventDefault();
        this.update.emit(this.community);
        
    }
    deleteThis() {
        this.delete.emit(this.community);
    }
}