import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Rx';

import { AuthService } from '../shared/auth.service';
import { Mission } from '../shared/models';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';

@Component({

    templateUrl: './mission-detail.component.html',
})
export class MissionDetailComponent {
    mission: Mission;
    missionService: FirebaseTypedService<Mission>;

    constructor(private route: ActivatedRoute, private fs: FirebaseService, private auth: AuthService, title: Title) {
        this.missionService = fs.attach<Mission>('/missions/');

        route.params.subscribe(params => {
            this.missionService.get(params['id'])
            .subscribe(next => {
                this.mission = next;
                title.setTitle(this.mission.name);
            });
        });
    }
}
