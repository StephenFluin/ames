import { Injectable, NgZone } from '@angular/core';
import { Mission } from '../shared/models';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';

declare var Zone;

@Injectable()
export class AuthService {
    userData : Observable<any>;
    updatableUser : FirebaseObjectObservable<any>;
    isAdmin : Observable<boolean>;
    
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
        });
       
       // isAdmin should be an observable that sends trues of falses as the users gains or loses admin access
       // Need to combine two streams. take the stream of auth data, and use it to generate a stream of values
       // for the /admin/[userid] and then check to see if the user is an admin
       // TODO: This code currently RUNS for each subscriber, whereas I just want each subscriber to get the latest value
       // when they start to subscribe, and to get the updates as they come in
       // .shared() does the latter, but not the former.
        this.isAdmin =  this.af.auth.flatMap( authState => {
            console.log("New Auth state!")
            if(!authState) {
                return Observable.of(false);
            } else {
                console.log("listening on /admin/",authState.uid);
                return this.af.database.object('/admin/'+authState.uid);
            }
        }).map( adminObject => {
            console.log("Looking in ",adminObject,"for permission");
            if(adminObject && adminObject.$value === true) {
                console.log(adminObject);
                return true;
            } else {
                return false;
            }
        }).multicast();
        this.isAdmin.subscribe(next=>console.log("Auth stream play:",next));
        
    }
    loginGoogle() {
        this.af.auth.login({
            provider: AuthProviders.Google,
            method: AuthMethods.Popup,
        });
    }
    loginPassword(username : string, password : string) {
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