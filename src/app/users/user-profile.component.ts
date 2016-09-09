import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../shared/auth.service';

@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: 'user-profile.component.html',
})
export class UserProfileComponent {
    auth: Observable<any>;
    userData: Observable<any>;
    showId: boolean;

    constructor(public authService : AuthService, public router : Router ) {
        this.auth = authService.af.auth;
        this.userData = authService.userData;
    }

    login() {
        this.authService.loginGoogle();
    }
    updateUser(user) {
        this.authService.updateUser(user);
        this.router.navigate(['/']);
    }
}
