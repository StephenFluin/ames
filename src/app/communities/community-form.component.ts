import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Community, Expert } from '../shared/models';
import { FirebaseService } from '../shared/firebase.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'community-form',
    template: `
    <form *ngIf="community" (submit)="save()" ngNoForm>
        <md-input placeholder="Name" [(ngModel)]="community.name"></md-input>
        <md-input placeholder="Banner URL" [(ngModel)]="community.bannerUrl"></md-input>
        <img [src]="community.bannerUrl" style="max-height:1em;"/>
        <md-input placeholder="Description" [(ngModel)]="community.description"></md-input>
        <md-input placeholder="Location" [(ngModel)]="community.location"></md-input>
        <label>Organizer 
        <select [(ngModel)]="community.organizer">
            <option *ngFor="let developer of developers | async" [value]="developer.$key">{{developer.name}}</option>
        </select>
        {{community.organizer}}
        </label>
        <md-input placeholder="URL" [(ngModel)]="community.url"></md-input>
        <div>Participants</div>
        <picker [list]="'/users/'" [order]="'name'" [selectedKeys]="community.members" (update)="chooseParticipants($event)"></picker>
        
        <div class="options">
            <span (click)="deleteThis()" class="delete">delete</span>
            <button md-raised-button color="primary" type="submit" >Save</button>
        </div>
    </form>
        `,
    styles: ['label input {display:block;margin-bottom:16px;}'],

})
export class CommunityFormComponent {
    @Output() update = new EventEmitter<Community>();
    @Output() delete = new EventEmitter<Community>();
    @Input() community: Community;


    developers: Observable<Expert[]>;

    constructor(public expertService: FirebaseService<Expert>, public af: AngularFire) {
        this.developers = this.af.database.list('/users/', { query: { orderByChild: 'name' } });
    }
    save() {
        event.preventDefault();
        this.update.emit(this.community);

    }
    deleteThis() {
        this.delete.emit(this.community);
    }
    chooseParticipants(list : string[]) {
        this.community.members = list;
    }
}