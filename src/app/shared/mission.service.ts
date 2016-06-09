import { Injectable } from '@angular/core';
import { Mission } from '../models';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class MissionService {
    
    items: FirebaseListObservable<Mission[]>;
    list: Observable<Mission[]>; 
    constructor(private af: AngularFire) {
        this.items = af.database.list('/missions');
        this.list = this.items.map(rawMissionSet => 
            rawMissionSet.map( rawMissionData => 
                new Mission(rawMissionData)
            )
        );
    }
    getMissionlist() : Observable<Mission[]> {
        return this.list;
        
    }
    getMission(key) : Observable<Mission> {
        return this.af.database.object('/missions/' + key);
    }
    new(mission : Mission) {
        this.items.push(mission);
    }
    save(mission : Mission) {
        this.af.database.object('/missions/' + mission.$key).update(mission);
    }
}