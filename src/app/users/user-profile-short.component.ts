import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../shared/auth.service';
import { ExpertFormComponent } from '../experts/expert-form.component';

import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: "user",
    template: `
    <h2 (click)="showId=!(showId)">Your Profile</h2>
    <form *ngIf="user" (submit)="next(user)" ngNoForm>

        <div>What's your name?</div>
        <label>Name <input name="name" [(ngModel)]="user.name"></label>
        <button md-button-raised (click)="next(user)">Next</button>
    </form>
    <p *ngIf="!user">We don't yet have any data for your user.</p>
    
    `,
    directives: [ExpertFormComponent]
    
})
export class UserProfileShortComponent {
    user: Observable<any>;
    
    constructor(private auth : AuthService, private router : Router, angularFire : AngularFire ) {
        auth.userData.subscribe( userObject => {
            console.log('Rendering',userObject);
            this.user = userObject;
        });
        
    }
    
    next(user) {
        event.preventDefault();
        this.auth.updateUser(user);
        this.router.navigate(['/profile']);
    }
}
