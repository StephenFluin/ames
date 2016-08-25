import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FirebaseService } from './shared/firebase.service';
import { UserLoginComponent } from './users/user-login.component';

import { AuthService } from './shared/auth.service';

declare var ga: any;

@Component({
    moduleId: module.id,
    selector: 'ames-app',
    templateUrl: 'ames.component.html',
    directives: [ UserLoginComponent],
    providers: [AuthService, FirebaseService],

})
export class AmesAppComponent {
    title = 'Community';


    constructor(public router: Router, public auth: AuthService) {
        router.events.filter(e => e instanceof NavigationEnd).subscribe((n: NavigationEnd) => {
            // Log analytics here
            ga('send', 'pageview', n.urlAfterRedirects);
        });
    }
    // Remove if/when https://github.com/angular/angular/issues/8357 is fixed
    home() {
        this.router.navigate(['/']);
    }



}
