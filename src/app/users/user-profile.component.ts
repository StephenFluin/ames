import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../shared/auth.service';
import { FirebaseObjectObservable } from 'angularfire2';

import { UserProfileFormComponent } from './user-profile-form.component';

@Component({
    moduleId: module.id,
    selector: "user",
    template: `<h2 fraggles="woot">Your Profile</h2>
    <p *ngIf="!(auth | async)?.uid"><button (click)="login()">Login with G</button></p>
    <p *ngIf="(userData)">user Data: {{ userData  | async | json}}</p>
    <user-profile [user]="userData | async" (update)="updateUser($event)"></user-profile>
    
    `,
    directives: [UserProfileFormComponent]
    
})
export class UserProfileComponent {
    content : string;
    auth: Observable<any>;
    userData: Observable<any>;
    
    
    constructor(private authService : AuthService ) {
        this.auth = authService.af.auth;
        this.userData = authService.userData;
        
        
    }
    
    login() {
        this.authService.loginGoogle();
    }
    updateUser(user) {
        console.log('updating from home');
        this.authService.updateUser(user);
    }
}
