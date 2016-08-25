import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';

import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';

import { RefirebasePipe } from '../shared/refirebase.pipe';

import { Event } from '../shared/models';
import { AuthService } from '../shared/auth.service';

import { FirebaseService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';

@Component({
    moduleId: module.id,
    selector: 'events-list',
    templateUrl: 'events.component.html',
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES, ROUTER_DIRECTIVES],
    pipes: [RefirebasePipe, FireJoinPipe],

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
        this.router.navigate(['/events/', event.$key, '/edit']);
    }

    new() {
        this.router.navigate(['/events/new/edit']);
    }
}
