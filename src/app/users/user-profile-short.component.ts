import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from '../shared/auth.service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: 'user-profile-short.component.html',
    styleUrls: ['user-profile-short.component.css', '../developers/expert-form.component.css']
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
