import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Event } from '../shared/models';
import { AuthService } from '../shared/auth.service';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';

@Component({

    selector: 'events-list',
    templateUrl: 'events.component.html',
})
export class EventsComponent {
    events;
    auth;
    eventService: FirebaseTypedService<Event>;

    constructor(private router: Router, private fs: FirebaseService, private authService: AuthService) {
        this.eventService = fs.attach<Event>('/events/', { query: { orderByChild: 'startDate' } });
        this.events = this.eventService.list;
        this.auth = authService;
    }

    edit(event) {
        this.router.navigate(['/events', event.$key, 'edit']);
    }

    new() {
        this.router.navigate(['/events/new/edit']);
    }
}
