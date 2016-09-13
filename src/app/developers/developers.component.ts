import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { RefirebasePipe } from '../shared/refirebase.pipe';

import { Expert } from '../shared/models';
import { AuthService } from '../shared/auth.service';

import { AngularFire } from 'angularfire2';
import { FirebaseService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';

@Component({

    selector: 'developers-list',
    templateUrl: 'developers.component.html',
    styleUrls: ['experts.component.scss']
})
export class DevelopersComponent {
    experts;
    auth;

    constructor(public router: Router, public expertService: FirebaseService<Expert>, public authService: AuthService, public af: AngularFire) {
        this.experts = af.database.list('/users/');

        this.auth = authService;
    }

    edit(expert) {
        this.router.navigate(['/developers', expert.$key, 'edit']);
    }
}
