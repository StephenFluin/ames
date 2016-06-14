import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

class HasKey {
    $key : string;
}

@Injectable()
export class FirebaseService<T extends HasKey> {
    
    items: FirebaseListObservable<T[]>;
    list: Observable<T[]>; 
    endpoint: string;
    
    constructor(private af: AngularFire ) {
        
    }
    
    setup(endpoint : string, type) {
        console.log("Configuring the generic firebase service with",endpoint,type);
        this.endpoint = endpoint;
        this.items = this.af.database.list(endpoint);
        this.list = this.items.map(rawTSet => 
            rawTSet.map( rawTData => 
                rawTData
            )
        );
    }
    getList() : Observable<T[]> {
        console.log("returning the presetup list from " + this.endpoint);
        return this.list;
        
    }
    get(key) : FirebaseObjectObservable<T> {
        let TObserver : FirebaseObjectObservable<any> = this.af.database.object(this.endpoint + key);
        return TObserver;
    }
    new(T : T) {
        this.items.push(T);
    }
    
    // This method is a giant hack. HERE BE DRAGONS
    // I manually remove the key (which I need so I know where to write to),
    // and then add it back
    save(item : T) {
        let key = item.$key;
        delete item.$key;
        this.af.database.object(this.endpoint + key).update(item);
        item.$key = key;
    }
    
    delete(item : T) {
        let key = item.$key;
        if(key) {
            this.af.database.object(this.endpoint + key).remove();
        }
        
    }
}