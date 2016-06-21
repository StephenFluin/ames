import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';

import { ArrayPipe } from '../shared/array.pipe';
import { AuthService } from '../shared/auth.service';
import { FirebaseObjectObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: 'user-login',
    template: `
    <div style="font-size:18px;">
        <div *ngFor="let user of userData | async | array">
            <div (click)="profile()">{{ user.name}}</div>
            <div (click)="logout()" style="font-size:12px">Logout</div>
        </div>
        <div *ngIf="!(userData | async)" (click)="login()">Login</div>   
             
    </div>
        `,
    directives: [ ROUTER_DIRECTIVES ],
    pipes: [ArrayPipe]
    
})
export class UserLoginComponent {
    auth: Observable<any>;
    userData: Observable<any>;
    
    
    constructor(private authService : AuthService, private router : Router ) {
        this.auth = authService.af.auth;
        this.userData = authService.userData;
        
        
    }
    
    login() {
        this.authService.loginGoogle();
    }
    logout() {
        console.log("Logging out.");
        this.authService.logout();
    }
    profile() {
        this.router.navigate(['/profile']);
    }
}