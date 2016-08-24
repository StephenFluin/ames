import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Event, Community } from '../shared/models';


@Component({
    moduleId: module.id,
    selector: 'event-form',
    template: `
    <form *ngIf="event" (submit)="save(event)" ngNoForm>
        <label><span i18n>Name</span> <input name="name" [(ngModel)]="event.name" required #spy></label>
        <label><span i18n>Description</span> <input [(ngModel)]="event.description"></label>
        
        <label><span i18n>URL</span> <input [(ngModel)]="event.url"></label>
        <label><span i18n>Address/Location</span> <input [(ngModel)]="event.location"></label>
        
        <label><span i18n>Start Date</span><input [(ngModel)]="event.startDate" type="date"></label>
        <label><span i18n>End Date</span><input [(ngModel)]="event.endDate" type="date"></label>
        <label><span i18n>Logo URL</span> <img *ngIf="event.logoUrl" [src]="event.logoUrl" style="max-height:1em;"> <input [(ngModel)]="event.logoUrl"></label>
        <label><span i18n="header for list of people who lead the event">Leads</span>
        <picker [list]="'/users/'" [order]="'name'" [selectedKeys]="event.leads" (update)="chooseLeads($event)"></picker></label>
        <label><span i18n>Speakers</span>
        <picker [list]="'/users/'" [order]="'name'" [selectedKeys]="event.speakers" (update)="chooseSpeakers($event)"></picker></label>
        <div class="options">
            <span (click)="deleteThis()" class="delete">delete</span>
            <button md-raised-button color="primary" type="submit" >Save</button>
        </div>
    </form>
        `,
})
export class EventFormComponent {
    @Output() update = new EventEmitter<Event>();
    @Output() delete = new EventEmitter<Event>();
    @Input() event : Event;
    
    save(savedValue: Event) {
        event.preventDefault();
        this.update.emit(savedValue);
        
        
    }
    deleteThis() {
        if(window.confirm("Are you sure you want to delete this?")) {
            this.delete.emit(this.event);
        }
        
    }
    // Take a new emitted list of keys
    chooseLeads(list : string[]) {
        this.event.leads = list;
    }
     chooseSpeakers(list : string[]) {
        this.event.speakers = list;
    }
}