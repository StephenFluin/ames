import { Injectable, NgZone } from '@angular/core';
import { Mission } from '../shared/models';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, AuthProviders, AuthMethods } from 'angularfire2';

declare var Zone;

@Injectable()
export class AuthService {
    userData : ReplaySubject<any>;
    
    
    constructor(public af: AngularFire, private zone: NgZone) {
        
        // Hack to get over firebase3 zone issues
        this.userData = new ReplaySubject(1);
        this.af.auth.flatMap( authState => {
            console.log("got the auth data");
            // If this returns <root> instead of angular, 
            // we have a problem and need to do this replaysubject stuff
            console.log(Zone.current.name);
            return af.database.object('/users/'+authState.uid);
            
        }).subscribe(n=> {
            zone.run(() => {
                this.userData.next(n);
            })
        });
       
        
        
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
    
    updateUser(user) {
        //af.database.object('/users/'+authState.uid)
    }
}