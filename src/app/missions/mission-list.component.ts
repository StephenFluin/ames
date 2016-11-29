import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { AuthService } from '../shared/auth.service';
import { Mission } from '../shared/models';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';

@Component({

    templateUrl: './mission-list.component.html',
    styleUrls: ['./mission-list.component.scss', '../developers/expert-form.component.scss']
})
export class MissionListComponent implements OnInit {
    list: FirebaseListObservable<Mission[]>;
    newMission: Mission;
    constructor(public af: AngularFire, public auth: AuthService, public route: ActivatedRoute, public router: Router) {
    }
    ngOnInit() {
        this.list = this.af.database.list('/missions/');
        this.newMission = new Mission();
    }
    createMission() {
        let result = this.list.push(this.newMission);
        this.newMission = new Mission();


        // Take the user to their mission
        this.router.navigate(['/missions', result.key, "edit"]);
    }

    edit(mission) {
        this.router.navigate(["/missions", mission.$key, 'edit'])
    }

}
