import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { Mission } from '../shared/models';
import { ROUTER_DIRECTIVES } from '@angular/router';

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
        
        <div class="options">
            <span (click)="deleteThis()" class="delete">delete</span>
            <button md-raised-button color="primary" type="submit" >Save</button>
        </div>
    </form>
        `,
    styles: ['label input {display:block;margin-bottom:16px;}'],
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class MissionFormComponent {
    @Output() update = new EventEmitter<Mission>();
    @Output() delete = new EventEmitter<Mission>();
    @Input() mission : Mission;
    
    save() {
        
        event.preventDefault();
        this.update.emit(this.mission);
        
    }
    deleteThis() {
        this.delete.emit(this.mission);
    }
}