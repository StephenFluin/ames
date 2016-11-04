import { Component } from '@angular/core';
import { Event } from '../shared/models';
import { EventFormComponent } from './event-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';

@Component({
    selector: 'event-edit',
    templateUrl: 'event-edit.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class EventEditComponent {
    event: Observable<Event>;
    id: string;
    eventService: FirebaseTypedService<Event>

    constructor(public route: ActivatedRoute, public router: Router, public fs: FirebaseService) {
        this.eventService = fs.attach<Event>('/events/');
        this.event = <Observable<Event>>route.params.switchMap(params => this.eventService.get(params['id']));
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
