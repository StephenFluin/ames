import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Expert } from '../shared/models';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';


/**
 * Render a view of a expert here
 */
@Component({

    selector: 'expert-detail',
    templateUrl: 'expert-view.component.html',
    styleUrls: ['expert-view.component.scss']

})
export class ExpertViewComponent {
    expert: Expert;
    expertService: FirebaseTypedService<Expert>;

    constructor(private route: ActivatedRoute, private fs: FirebaseService, title: Title) {
        this.expertService = fs.attach<Expert>('/users/');

        // This calls .subscribe so we don't rely on the template for unrolling
        // the observable (which requires 2 components)
        route.params.subscribe(params =>
            this.expertService.get(params['id']).subscribe((expert) => {
                this.expert = expert;
                title.setTitle(this.expert.name);
            })
        );
    }
}
