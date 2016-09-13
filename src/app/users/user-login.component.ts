import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { FirebaseObjectObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: 'user-login',
    templateUrl: 'user-login.component.html',
})
export class UserLoginComponent {
    userData: Observable<any>;
    constructor(private auth: AuthService, private router: Router) {
        this.userData = auth.userData;
    }
    login() {
        this.auth.loginGoogle();
    }
    logout() {
        this.auth.logout();
    }
}
