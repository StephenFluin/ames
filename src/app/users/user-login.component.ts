import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';
import { FirebaseObjectObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: 'user-login',
    template: `
    <div style="font-size:18px;">
        <div *ngFor="let user of userData | async | array">
            <a [routerLink]="['/profile']"><span *ngIf="auth.isAdmin | async" class="adminIcon"></span>{{ user.name }}</a>
            <div (click)="logout()" style="font-size:12px">Logout</div>
        </div>
        <div *ngIf="!(userData | async)"><button (click)="login()">Login</button></div>   
             
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
        console.log("Logging out.");
        this.auth.logout();
    }
}