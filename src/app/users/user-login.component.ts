import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { FirebaseObjectObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: 'user-login',
    template: `
    <div>
        <div *ngFor="let user of userData | async | array">
            <a [routerLink]="['/profile']"><span *ngIf="auth.isAdmin | async" class="adminIcon"></span>{{ user.name }}</a>
            <div (click)="logout()" style="font-size:12px" i18n>Logout</div>
        </div>
        <a class="navigation__link"  (click)="login()" *ngIf="!(userData | async)" i18n> Login </a>
    </div>
        `,

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
