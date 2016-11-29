import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { FirebaseService } from './shared/firebase.service';

import { AuthService } from './shared/auth.service';

declare var ga: any;

@Component({

    selector: 'app-root',
    templateUrl: './ames.component.html',
    providers: [AuthService, FirebaseService, Title],

})
export class AmesAppComponent {
    siteMenu: boolean;
    constructor(public router: Router, public auth: AuthService, public title: Title) {
        router.events.filter(e => e instanceof NavigationEnd).subscribe((n: NavigationEnd) => {
            ga('send', 'pageview', n.urlAfterRedirects);
            let pageTitle = router.routerState.snapshot.root.children[0].data['title'];
            if (pageTitle) {
                title.setTitle(pageTitle);
            } else {
                title.setTitle("Angular Community");
            }
        });
    }
}
