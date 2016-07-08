import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../shared/auth.service';
import { ExpertFormComponent } from '../experts/expert-form.component';

@Component({
    moduleId: module.id,
    selector: "user",
    template: `<h2 (click)="showId=!(showId)">Your Profile</h2> <span *ngIf="showId">My ID is: {{(auth | async)?.uid}} </span>
    <expert-form [expert]="userData | async" (update)="updateUser($event)" class="contents"></expert-form>
    
    `,
    directives: [ExpertFormComponent]
    
})
export class UserProfileComponent {
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
        console.debug("About to update user from profile component with",this.authService);
        this.authService.updateUser(user);
    }
}
