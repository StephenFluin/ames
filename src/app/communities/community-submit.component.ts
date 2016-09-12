import { Component } from '@angular/core';
import { Community } from '../shared/models';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'community-submit',
    templateUrl: 'community-submit.component.html',
    styleUrls: ['../developers/expert-form.component.css']
})
export class CommunitySubmitComponent {
    community: Community;
    id: string;


    constructor(public af: AngularFire, public router: Router) {
        this.community = new Community();
    }

    processUpdate(item: Community) {
        delete item.$key;
        this.af.database.list('/queues/communities/')
            .push(item);
        this.router.navigate(['/communities']);
    }
}
