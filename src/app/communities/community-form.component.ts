import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Community, Expert } from '../shared/models';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Component({

    selector: 'community-form',
    templateUrl: 'community-form.component.html',
    styleUrls: ['../developers/expert-form.component.scss']

})
export class CommunityFormComponent {
    @Output() update = new EventEmitter<Community>();
    @Output() delete = new EventEmitter<Community>();
    @Input() community: Community;


    developers: Observable<Expert[]>;

    constructor(public af: AngularFire) {
        this.developers = this.af.database.list('/users/', { query: { orderByChild: 'name' } });
    }
    save(domEvent) {
        domEvent.preventDefault();
        this.update.emit(this.community);

    }
    deleteThis() {
        this.delete.emit(this.community);
    }
    chooseParticipants(list : string[]) {
        this.community.members = list;
    }
}
