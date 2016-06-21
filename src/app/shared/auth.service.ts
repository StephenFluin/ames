import { Injectable, NgZone } from '@angular/core';
import { Mission } from '../shared/models';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';

declare var Zone;

@Injectable()
export class AuthService {
    userData : Observable<any>;
    updatableUser : FirebaseObjectObservable<any>;
    
    
    constructor(public af: AngularFire, private zone: NgZone) {
        
        
        this.userData = this.af.auth.flatMap( authState => {
            
            // Detect bugs in angularfire's change detection
            if(Zone.current.name == '<root>') {
                console.debug("Problem with zone patching!",Zone.current.name);
            } 
            
            if(authState) {
                this.updatableUser = af.database.object('/users/'+authState.uid);
                return this.updatableUser;
            } else {
                this.updateUser = null;
                return Observable.of(null);
                
            }
        }).share();
       
        
        
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