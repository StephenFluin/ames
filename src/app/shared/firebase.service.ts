import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

class HasKey {
    $key : string;
}

@Injectable()
export class FirebaseService<T extends HasKey> {
    public list: Observable<T[]>;
    
    private firebaseList: FirebaseListObservable<T[]>;
    private endpoint: string;
     
    
    
    constructor(private af: AngularFire ) {
        
    }

    setup(endpoint : string) {
        this.endpoint = endpoint;
        this.firebaseList = this.af.database.list(endpoint);
        this.list = this.firebaseList.map(rawTSet => 
            rawTSet.map( rawTData => 
                rawTData
            )
        );
    }
    get(key) : Observable<T> {
        let observer : FirebaseObjectObservable<T> = this.af.database.object(this.endpoint + key);
        return observer.map(item => {
            item.$key = key; 
            return item
        });
    }
    new(item : T) : any {
        console.log("pushing new ",item," onto ",this.endpoint,this.firebaseList);
        let result = this.firebaseList.push(item);
        console.log(result);
        result.then(success => console.log("success",success), failure => console.log("failure",failure));
        return result;
        
    }
    
    // This method is fightin angularfire. HERE BE DRAGONS
    // I manually remove the key (which I need so I know where to write to),
    // and then add it back
    save(item : T) : T {
        console.log("Saving",this.endpoint,item);
        let key = item.$key;
        delete item.$key;
        if(key === 'new') {
            key = this.new(item).key;
        } else {
            this.af.database.object(this.endpoint + key).update(item);
        }
        item.$key = key;
        return item;
    }
    
    delete(item : T) {
        let key = item.$key;
        if(key) {
            this.af.database.object(this.endpoint + key).remove();
        }
        
    }
}