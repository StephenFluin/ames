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
        <label>Name <input [(ngModel)]="community.name"></label>
        <label>Description <input [(ngModel)]="community.description"></label>
        <label>Location <input [(ngModel)]="community.location"></label>
        <label>Organizer 
        <select [(ngModel)]="community.organizer">
            <option *ngFor="let developer of developers | async" [value]="developer.$key">{{developer.name}}</option>
        </select>
        {{community.organizer}}
        </label>
        <label>URL<input [(ngModel)]="community.url"></label>
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