import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../shared/auth.service';
import { FirebaseObjectObservable } from 'angularfire2';

import { ExpertFormComponent } from '../experts/expert-form.component';
import { UserProfileFormComponent } from './user-profile-form.component';

@Component({
    moduleId: module.id,
    selector: "user",
    template: `<h2>Your Profile</h2>
    <p *ngIf="!(auth | async)?.uid"><button (click)="login()">Login with G</button></p>
    <expert-form [expert]="userData | async" (update)="updateUser($event)" class="contents"></expert-form>
    
    `,
    directives: [UserProfileFormComponent, ExpertFormComponent]
    
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
