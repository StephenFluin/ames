import { Component } from '@angular/core';
import { Community } from '../shared/models';
import { CommunityFormComponent } from './community-form.component';
import { Router } from '@angular/router';
import { AngularFire } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'community-submit',
    template: `
    <h2>Submit New Community</h2>
    <p>Thanks for submitting a community. If it meets our quality guidelines, we'd be happy to add it!</p>
    <community-form [community]="community" (update)="processUpdate($community)"></community-form>`,
    directives: [CommunityFormComponent],

})
export class CommunitySubmitComponent {
    community: Community;
    id: string;

    constructor(private af: AngularFire, private router: Router) {
        this.community = new Community();
    }

    processUpdate(item: Community) {
        delete item.$key;
        this.af.database.list('/queues/communities/')
            .push(item);
        this.router.navigate(['/communities']);
    }
}