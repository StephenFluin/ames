import { Injectable } from '@angular/core';
import { Mission } from '../models';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class AuthService {
    isAdmin() {
        return true;
    }
}