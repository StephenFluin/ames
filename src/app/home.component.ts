import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './shared/auth.service';
import { FirebaseObjectObservable } from 'angularfire2';

import { UserProfileComponent } from './users/user-profile.component';

@Component({
    template: 'SUBCOMPONENT',
    selector: 'subcomponent'
})
export class SubComponent {
    
}

@Component({
    moduleId: module.id,
    template: `<p>Angular is great, but we're only successful because we have an awesome community. This site is designed to help you find Experts, join a Group, or take on a Mission to help Angular.</p>
    
    <p *ngIf="!(auth | async)?.uid"><button (click)="login()">Login with G</button></p>
    <p *ngIf="(userData)">user Data: {{ userData  | async | json}}</p>
    <user-profile [user]="userData | async" (update)="updateUser($event)"></user-profile>
    
    `,
    directives: [SubComponent, UserProfileComponent]
    
})
export class HomeComponent {
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
