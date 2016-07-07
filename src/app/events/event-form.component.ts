import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Event, Community } from '../shared/models';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { PickerComponent } from '../shared/picker.component';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'event-form',
    template: `
    <form *ngIf="event" (submit)="save(event)" ngNoForm>
        <label>Name <input name="name" [(ngModel)]="event.name" required #spy></label>
        <label>Description <input [(ngModel)]="event.description"></label>
        
        <label>URL <input [(ngModel)]="event.url"></label>
        <label>Address/Location <input [(ngModel)]="event.location"></label>
        
        <label>Start Date<input [(ngModel)]="event.startDate" type="date"></label>
        <label>End Date<input [(ngModel)]="event.endDate" type="date"></label>
        <label>Logo URL <img *ngIf="event.logoUrl" [src]="event.logoUrl" style="max-height:1em;"> <input [(ngModel)]="event.logoUrl"></label>
        <div>Leads</div>
        <picker [list]="'/users/'" [order]="'name'" [selectedKeys]="event.leads" (update)="chooseLeads($event)"></picker>
        <div>Speakers</div>
        <picker [list]="'/users/'" [order]="'name'" [selectedKeys]="event.speakers" (update)="chooseSpeakers($event)"></picker>
        
        <button type="submit">Save</button>
        <button (click)="deleteEvent()" type="button">DELETE</button>
    </form>
        `,
    styles: [],
    directives: [ ROUTER_DIRECTIVES, MD_SLIDE_TOGGLE_DIRECTIVES, PickerComponent, REACTIVE_FORM_DIRECTIVES ],
    
})
export class EventFormComponent {
    @Output() update = new EventEmitter<Event>();
    @Output() delete = new EventEmitter<Event>();
    @Input() event : Event;
    
    save(savedValue: Event) {
        event.preventDefault();
        this.update.emit(savedValue);
        
        
    }
    deleteEvent() {
        console.log("Trying to delete." ,this.event);
        this.delete.emit(this.event);
        
    }
    // Take a new emitted list of keys
    chooseLeads(list : string[]) {
        console.log("Lead List is now ",list);
        this.event.leads = list;
    }
     chooseSpeakers(list : string[]) {
        console.log("Speakers List is now ",list);
        this.event.speakers = list;
    }
}