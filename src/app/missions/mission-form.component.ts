import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Mission, Expert } from '../shared/models';
import { PickerComponent } from '../shared/picker.component';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({

    selector: 'mission-form',
    templateUrl: './mission-form.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class MissionFormComponent {
    @Output() update = new EventEmitter<Mission>();
    @Output() delete = new EventEmitter<Mission>();
    @Input() mission: Mission;

    developers: Observable<Expert[]>;

    constructor(private af: AngularFire) {
        this.developers = this.af.database.list('/users/', { query: { orderByChild: 'name' } });
    }
    save() {
        event.preventDefault();
        this.update.emit(this.mission);

    }
    deleteThis() {
        this.delete.emit(this.mission);
    }
    chooseParticipants(list : string[]) {
        this.mission.participants = list;
    }
}
