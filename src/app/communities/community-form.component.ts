import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Community, Expert } from '../shared/models';
import { FirebaseService } from '../shared/firebase.service';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'community-form',
    templateUrl: 'community-form.component.html',
    styleUrls: ['../developers/expert-form.component.css']

})
export class CommunityFormComponent {
    @Output() update = new EventEmitter<Community>();
    @Output() delete = new EventEmitter<Community>();
    @Input() community: Community;


    developers: Observable<Expert[]>;

    constructor(public expertService: FirebaseService<Expert>, public af: AngularFire) {
        this.developers = this.af.database.list('/users/', { query: { orderByChild: 'name' } });
    }
    save() {
        event.preventDefault();
        this.update.emit(this.community);

    }
    deleteThis() {
        this.delete.emit(this.community);
    }
    chooseParticipants(list : string[]) {
        this.community.members = list;
    }
}
