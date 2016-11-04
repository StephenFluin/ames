import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MissionFormComponent } from './mission-form.component';
import { Mission } from '../shared/models';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { Observable } from 'rxjs/Rx';

@Component({

    templateUrl: 'mission-edit.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class MissionEditComponent {
    id: string;
    // Note that this doesn't match the detail component
    mission: Observable<Mission>;
    missionService: FirebaseTypedService<Mission>;

    constructor(public route: ActivatedRoute, public router: Router, public fs: FirebaseService) {
        this.missionService = fs.attach<Mission>('/missions/');

        this.mission = route.params.flatMap(params => {
            return this.missionService.get(params['id']);
        });
        route.params.subscribe(next => this.id = next['id'], error => console.error(error), () => console.log('finished'));
    }

    save(mission) {
        console.log("saving from component", mission);
        this.missionService.save(mission);
        this.router.navigate(['../../'], { relativeTo: this.route });
    }
    delete(mission) {
        this.missionService.delete(mission);
        this.router.navigate(['../../'], { relativeTo: this.route });


    }

}
