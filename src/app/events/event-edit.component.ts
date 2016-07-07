import { Component } from '@angular/core';
import { Event } from '../shared/models';
import { EventFormComponent } from './event-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    selector: 'event-edit',
    template: `
    <h2> <a [routerLink]="['/events']">Events</a> &gt; <span *ngIf="(event | async)?.$key=='new' && !(event | async)?.firstName && !(event | async)?.lastName">New Event</span>{{(event | async)?.firstName}} {{(event | async)?.lastName}}</h2>
    <event-form [event]="event | async" (update)="processUpdate($event)" (delete)="delete($event)"></event-form>`,
    providers: [],
    directives: [EventFormComponent, ROUTER_DIRECTIVES],
    
})
export class EventEditComponent {
    event : Observable<Event>;
    id : string;
    
    constructor(private route : ActivatedRoute, private router: Router, private eventService : FirebaseService<Event>) {
        eventService.setup('/events/');
        this.event = route.params.flatMap( params => {
            if(params['id'] == "new") {
                return Observable.of(new Event());
            }
            return eventService.get(params['id'])
        });
    }
    
    processUpdate(eventUpdate : Event) {
        console.log("Procsesing an update");
        this.eventService.save(eventUpdate);
        this.router.navigate(['/events']);
    }
    delete(event : Event) {
        console.log("Processing delete");
        this.eventService.delete(event);
        this.router.navigate(['/events']);
    }
}