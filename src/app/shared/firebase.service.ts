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
        this.endpoint = endpoint;
        this.items = this.af.database.list(endpoint);
        this.list = this.items.map(rawTSet => 
            rawTSet.map( rawTData => 
                rawTData
            )
        );
    }
    getList() : Observable<T[]> {
        return this.list;
        
    }
    get(key) : FirebaseObjectObservable<T> {
        let TObserver : FirebaseObjectObservable<any> = this.af.database.object(this.endpoint + key);
        return TObserver;
    }
    new(item : T) : Promise<T> {
        console.log("Pushing new item into list");
        let result = this.items.push(item);
        console.log(result);
        
        // Try to do the firebase push
        // Intercept the FB promise to add $key to the object if successful and resolve
        // Otherwise reject
        return new Promise<T>((resolve,reject) => {
            result.then(success => {
                item.$key = success.path.u[1];
                resolve(item);
            }, failure => {
                console.log("failure in firebase push",failure);
                reject(failure);
            })
        });
       
        
    }
    
    // This method is a giant hack. HERE BE DRAGONS
    // I manually remove the key (which I need so I know where to write to),
    // and then add it back
    save(item : T) : Promise<T> {
        console.log("Saving key in service");
        if(item.$key == 'new') {
            delete item.$key;
            return this.new(item);
        } else {
            let key = item.$key;
            delete item.$key;
            this.af.database.object(this.endpoint + key).update(item);
            item.$key = key;
            return new Promise<T>((resolve,reject) => {
                resolve(item);
            })
        }
    }
    
    delete(item : T) {
        let key = item.$key;
        if(key) {
            this.af.database.object(this.endpoint + key).remove();
        }
        
    }
}