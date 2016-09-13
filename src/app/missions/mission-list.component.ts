import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { AuthService } from '../shared/auth.service';
import { Mission } from '../shared/models';
import { Observable } from 'rxjs';

@Component({

    templateUrl: 'mission-list.component.html',
    styleUrls: ['mission-list.component.scss', '../developers/expert-form.component.scss']
})
export class MissionListComponent implements OnInit {
    list: Observable<Mission[]>;
    newMission: Mission;
    constructor(public missionService: FirebaseService<Mission>, public auth: AuthService, public route: ActivatedRoute, public router: Router) {
    }
    ngOnInit() {
        this.missionService.setup('/missions/');
        this.list = this.missionService.list;
        this.newMission = new Mission();
    }
    createMission() {
        this.missionService.new(this.newMission);
        this.newMission = new Mission();

        // Take the user to their mission
        this.router.navigate(['./'], { relativeTo: this.route });
    }

    edit(mission) {
        this.router.navigate(["/missions", mission.$key, 'edit'])
    }

}
