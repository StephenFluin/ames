import { Injectable } from '@angular/core';
import { Mission } from '../shared/models';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

@Injectable()
export class AuthService {
    constructor(public af: AngularFire) {
        this.af.auth.subscribe(auth => console.log("Auth Service got update from af:",auth));
    }
    
    isAdmin() {
        return true;
    }
    loginGoogle() {
        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        });
    }
    loginPassword(username : string, password : string) {
        console.log("Let's login!");
        this.af.auth.login(
            {
                email: username,
                password: password
            },
            {
                method: AuthMethods.Password,
                provider: AuthProviders.Password}
            );
    }
    
    loginAnonymous() {
        this.af.auth.login({
            provider: AuthProviders.Anonymous,
            method: AuthMethods.Anonymous
        })
    }
}