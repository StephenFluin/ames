import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../shared/models';
import { AuthService } from '../shared/auth.service';
import { FirebaseService } from '../shared/firebase.service';

@Component({

    selector: 'events-list',
    templateUrl: 'events.component.html',
})
export class EventsComponent {
    events;
    auth;

    constructor(private router: Router, private eventService: FirebaseService<Event>, private authService: AuthService) {

        eventService.setup('/events/', { query: { orderByChild: 'startDate' } });
        this.events = eventService.list;
        this.auth = authService;
    }

    edit(event) {
        this.router.navigate(['/events', event.$key, 'edit']);
    }

    new() {
        this.router.navigate(['/events/new/edit']);
    }
}
