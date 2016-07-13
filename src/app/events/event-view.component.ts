import { Component } from '@angular/core';
import { Event } from '../shared/models';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';


/**
 * Render a view of a event here
 */
@Component({
    moduleId: module.id,
    selector: 'event-view',
    template: `
    <div *ngIf="event" class="content">
        <img [src]="event.logoUrl" style="max-height:50px;max-width:50px;">
        <h2>{{event.name }}</h2>
        <div><strong>Location:</strong> {{event.location}}</div>
    </div>
    <div *ngIf="!event">
        <p>Event not found.</p>
    </div>
    `,
    providers: [],
    pipes: [FireJoinPipe],
    directives: [],
    
})
export class EventViewComponent {
    event : Event;
    
    constructor(private route : ActivatedRoute, private eventService : FirebaseService<Event>) {
        eventService.setup('/events/');
        
        // This calls .subscribe so we don't rely on the template for unrolling 
        // the observable (which requires 2 components)
       route.params.subscribe( params =>
            eventService.get(params['id']).subscribe((event) => {
                 this.event = event;
            })
        );
    }
}