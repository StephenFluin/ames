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
        <label>Twitter <input [(ngModel)]="event.twitterID"></label>
        <label>Bio <input [(ngModel)]="event.bio"></label>
        <label>URL<input [(ngModel)]="event.url"></label>
        <label>Blog UR L<input [(ngModel)]="event.blogUrl"></label>
        <label>Pic URL <img *ngIf="event.picUrl" [src]="event.picUrl" style="max-height:1em;"> <input [(ngModel)]="event.picUrl"></label>
        <label>Resume URL <input [(ngModel)]="event.resumeUrl"></label>
        <label>LinkedIn <input [(ngModel)]="event.linkedIn"></label>
        <div>Communities</div>
        <picker [list]="'/communities/'" [order]="'firstName'" [selectedKeys]="event.communities" (update)="chooseCommunity($event)"></picker>
        
        <label>GDE? <md-slide-toggle [(ngModel)]="event.isGDE"></md-slide-toggle></label>
        <label>Consultant? <md-slide-toggle [(ngModel)]="event.ngConsult"></md-slide-toggle></label>
        
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
        console.log("Processing save for", savedValue);
        event.preventDefault();
        this.update.emit(savedValue);
        
        
    }
    deleteEvent() {
        console.log("Trying to delete." ,this.event);
        this.delete.emit(this.event);
        
    }
    // Take a new emitted list of keys
    chooseCommunity(list : string[]) {
        console.log("Community List is now ",list);
        //this.event.communities = list;
    }
}