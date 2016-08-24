import { Injectable, NgZone } from '@angular/core';
import { Mission } from '../shared/models';
import { Observable, ReplaySubject } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods } from 'angularfire2';
import { Router } from '@angular/router';

declare var Zone;

@Injectable()
export class AuthService {
    userData : Observable<any>;
    updatableUser : FirebaseObjectObservable<any>;
    isAdmin : Observable<boolean>;
    isUser: Observable<boolean>;
    uid: Observable<string>;
    
    constructor(public af: AngularFire, private zone: NgZone, private router : Router) {
        
        this.userData = this.af.auth.flatMap( authState => {
            // Overcome angularfire's zone smashing
            return zone.run((): Observable<any> => {
                if(authState) {
                    this.updatableUser = af.database.object('/users/'+authState.uid);
                    return this.updatableUser;
                } else {
                    this.updatableUser = null;
                    return Observable.of(null);
                    
                }
                
            });
            
        }).cache(1);

        // Detect missing user data and forward to quick-profile
        this.userData.subscribe( authState => {
            if(authState != null && !authState.name) {
                this.router.navigate(['/profile-short']);
            }
        });
       
       // isAdmin should be an observable that sends trues of falses as the users gains or loses admin access
       // Need to combine two streams. take the stream of auth data, and use it to generate a stream of values
       // for the /admin/[userid] and then check to see if the user is an admin
        this.isAdmin =  this.af.auth.switchMap( authState => {
            // Overcome angularfire's zone smashing
            return zone.run((): Observable<boolean> => {
                if(!authState) {
                    return Observable.of(false);
                } else {
                    return this.af.database.object('/admin/'+authState.uid)
                    .catch((a, b) => {
                        // This permission error means we aren't an admin
                        return Observable.of(false)
                    });
                }
            });
        }).map( adminObject => 
             (adminObject && adminObject['$value'] === true)
        ).cache(1);
        
        this.isUser =  this.af.auth.map( authState => !!authState).cache(1);
        
        this.uid = this.af.auth.switchMap( authState => {
            if(!authState) {
                return Observable.of(null);
            } else {
                return Observable.of(authState.uid);
            }
        }).cache(1);

        
        
        
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
    
    /**
     * Take a firebase user (with $key) and use angularfire to update
     */
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