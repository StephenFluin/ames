import { Component } from '@angular/core';
import { Event } from '../shared/models';
import { EventFormComponent } from './event-form.component';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'event-submit',
    template: `
    <h2>Submit New Event</h2>
    <p>Thanks for submitting an event. If it meets our quality guidelines, we'd be happy to add it!</p>
    <event-form [event]="event" (update)="processUpdate($event)"></event-form>`,
    directives: [EventFormComponent],
    
})
export class EventSubmitComponent {
    event : Event;
    id : string;
    
    constructor(private af : AngularFire, private router: Router) {
       this.event = new Event();
    }
    
    processUpdate(item : Event) {
        delete item.$key;
        this.af.database.list('/queues/events/')
            .push(item);
        this.router.navigate(['/events']);
    }
}