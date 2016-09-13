import { Component } from '@angular/core';
import { Event } from '../shared/models';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({

    selector: 'event-submit',
    templateUrl: 'event-submit.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class EventSubmitComponent {
    event: Event;
    id: string;

    constructor(private af: AngularFire, private router: Router) {
        this.event = new Event();
    }

    processUpdate(item: Event) {
        delete item.$key;
        this.af.database.list('/queues/events/')
            .push(item);
        this.router.navigate(['/events']);
    }
}
