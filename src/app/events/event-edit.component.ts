import { Component } from '@angular/core';
import { Event } from '../shared/models';
import { EventFormComponent } from './event-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    selector: 'event-edit',
    template: `
    <event-form [event]="event | async" (update)="processUpdate($event)" (delete)="delete($event)"></event-form>`,
})
export class EventEditComponent {
    event: Observable<Event>;
    id: string;

    constructor(public route: ActivatedRoute, public router: Router, public eventService: FirebaseService<Event>) {
        eventService.setup('/events/');
        this.event = route.params.flatMap(params => {
            if (params['id'] == "new") {
                return Observable.of(new Event());
            }
            return eventService.get(params['id'])
        });
    }

    processUpdate(eventUpdate: Event) {
        console.log("Procsesing an update");
        this.eventService.save(eventUpdate);
        this.router.navigate(['/events']);
    }
    delete(event: Event) {
        console.log("Processing delete");
        this.eventService.delete(event);
        this.router.navigate(['/events']);
    }
}