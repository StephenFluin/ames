import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Event, Community } from '../shared/models';


@Component({

    selector: 'event-form',
    templateUrl: 'event-form.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class EventFormComponent {
    @Output() update = new EventEmitter<Event>();
    @Output() delete = new EventEmitter<Event>();
    @Input() event: Event;

    save(domEvent, savedValue: Event) {
        domEvent.preventDefault();
        this.update.emit(savedValue);
    }
    deleteThis() {
        if (window.confirm("Are you sure you want to delete this?")) {
            this.delete.emit(this.event);
        }

    }
    // Take a new emitted list of keys
    chooseLeads(list: string[]) {
        this.event.leads = list;
    }
    chooseSpeakers(list: string[]) {
        this.event.speakers = list;
    }
}
