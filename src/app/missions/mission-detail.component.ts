import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../shared/auth.service';
import { Mission } from '../shared/models';
import { FirebaseService } from '../shared/firebase.service';

@Component({

    templateUrl: 'mission-detail.component.html',
})
export class MissionDetailComponent {
    mission: Mission;

    constructor(private route: ActivatedRoute, private missionService: FirebaseService<Mission>, private auth: AuthService, title: Title) {
        missionService.setup('/missions/');

        route.params.subscribe(params => {
            missionService.get(params['id'])
            .subscribe(next => {
                this.mission = next;
                title.setTitle(this.mission.name);
            });
        });
    }
}
