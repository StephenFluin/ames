import { Injectable, NgZone } from '@angular/core';
import { Mission } from '../shared/models';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';

declare var Zone;

@Injectable()
export class AuthService {
    userData : ReplaySubject<any>;
    updatableUser : FirebaseObjectObservable<any>;
    
    
    constructor(public af: AngularFire, private zone: NgZone) {
        
        // Hack to get over firebase3 zone issues
        this.userData = new ReplaySubject(1);
        this.af.auth.flatMap( authState => {
            console.log("got the auth data");
            // If this returns <root> instead of angular, 
            // we have a problem and need to do this replaysubject stuff
            console.log(Zone.current.name);
            this.updatableUser = af.database.object('/users/'+authState.uid);
            return this.updatableUser;
            
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
    logout() {
        this.af.auth.logout();
    }
    
    updateUser(user) {
        console.log("Propagating update back to fb",user);
        let key = user.$key;
        let value = user.$value;
        delete user.$key;
        delete user.$value;
        this.updatableUser.update(user);
        user.$key = key;
    }
}