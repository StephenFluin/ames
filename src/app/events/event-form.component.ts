import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Event, Community } from '../shared/models';


@Component({
    moduleId: module.id,
    selector: 'event-form',
    template: `
    <form *ngIf="event" (submit)="save(event)" ngNoForm>
        <md-input i18n-placeholder placeholder="Name" [(ngModel)]="event.name" required #spy></md-input>
        <md-input i18n-placeholder placeholder="Description" [(ngModel)]="event.description"></md-input>
        
        <md-input i18n-placeholder placeholder="URL" [(ngModel)]="event.url"></md-input>
        <md-input i18n-placeholder placeholder="Address/Location" [(ngModel)]="event.location"></md-input>
        
        <md-input i18n-placeholder placeholder="Start Date" [(ngModel)]="event.startDate" type="date"></md-input>
        <md-input i18n-placeholder placeholder="End Date" [(ngModel)]="event.endDate" type="date"></md-input>
        <md-input i18n-placeholder placeholder="Logo URL" [(ngModel)]="event.logoUrl"></md-input><img *ngIf="event.logoUrl" [src]="event.logoUrl" style="max-height:1em;">
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