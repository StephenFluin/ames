import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../shared/auth.service';
import { ExpertFormComponent } from '../experts/expert-form.component';

@Component({
    moduleId: module.id,
    selector: "user",
    template: `
    <h2 (click)="showId=!(showId)">Your Profile</h2> 
    <span *ngIf="showId">My ID is: {{(auth | async)?.uid}} </span>
    <p *ngIf="!(userData | async)">We don't yet have any data for your user.</p>
    <expert-form [expert]="userData | async" (update)="updateUser($event)" class="contents"></expert-form>
    
    `,
    directives: [ExpertFormComponent]
    
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
