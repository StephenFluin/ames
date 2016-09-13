import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FirebaseService } from './shared/firebase.service';

import { AuthService } from './shared/auth.service';

declare var ga: any;

@Component({

    selector: 'app-root',
    templateUrl: 'ames.component.html',
    providers: [AuthService, FirebaseService],

})
export class AmesAppComponent {
    constructor(public router: Router, public auth: AuthService) {
        router.events.filter(e => e instanceof NavigationEnd).subscribe((n: NavigationEnd) => {
            ga('send', 'pageview', n.urlAfterRedirects);
        });
    }
}
