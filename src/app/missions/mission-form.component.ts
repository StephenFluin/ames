import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Mission, Expert } from '../shared/models';
import { PickerComponent } from '../shared/picker.component';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';

@Component({
    moduleId: module.id,
    selector: 'mission-form',
    template: `
    <form *ngIf="mission" (submit)="save()" ngNoForm>
        <label><input [(ngModel)]="mission.name" placeholder="name"></label>
        <label><textarea [(ngModel)]="mission.description" placeholder="description"></textarea></label>
       <!-- <div *ngIf="mission.startDate && mission.endDate">
            {{ mission.startDate}} - {{ mission.endDate}}
        </div>-->
        <label>Organizer 
        <select [(ngModel)]="mission.organizer">
            <option *ngFor="let developer of developers | async" [value]="developer.$key">{{developer.name}}</option>
        </select>
        </label>
        <div>Participants</div>
        <picker [list]="'/users/'" [order]="'name'" [selectedKeys]="mission.participants" (update)="chooseParticipants($event)"></picker>
        
        <div class="options">
            <span (click)="deleteThis()" class="delete">delete</span>
            <button md-raised-button color="primary" type="submit" >Save</button>
        </div>
    </form>
        `,
    styles: ['label input {display:block;margin-bottom:16px;}'],
})
export class MissionFormComponent {
    @Output() update = new EventEmitter<Mission>();
    @Output() delete = new EventEmitter<Mission>();
    @Input() mission: Mission;

    developers: Observable<Expert[]>;

    constructor(private af: AngularFire) {
        this.developers = this.af.database.list('/users/', { query: { orderByChild: 'name' } });
    }
    save() {
        event.preventDefault();
        this.update.emit(this.mission);

    }
    deleteThis() {
        this.delete.emit(this.mission);
    }
    chooseParticipants(list : string[]) {
        this.mission.participants = list;
    }
}