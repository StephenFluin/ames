import { Injectable } from '@angular/core';
import { Mission } from '../shared/models';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class MissionService {
    
    items: FirebaseListObservable<Mission[]>;
    public missions: Observable<Mission[]>; 
    constructor(private af: AngularFire) {
        this.items = af.database.list('/missions');
        this.missions = this.items.map(rawMissionSet => 
            rawMissionSet.map( rawMissionData => 
                new Mission(rawMissionData)
            )
        );
    }
    getMission(key) : FirebaseObjectObservable<Mission> {
        let missionObserver : FirebaseObjectObservable<any> = this.af.database.object('/missions/' + key);
        return missionObserver;
    }
    new(mission : Mission) {
        this.items.push(mission);
    }
    
    // This method is a giant hack. HERE BE DRAGONS
    // I manually remove the key (which I need so I know where to write to),
    // and then add it back
    save(mission : Mission) {
        let key = mission.$key;
        delete mission.$key;
        this.af.database.object('/missions/' + key).update(mission);
        mission.$key = key;
    }
    
    delete(mission : Mission) {
        let key = mission.$key;
        if(key) {
            this.af.database.object('/missions/' + key).remove();
        }
        
    }
}