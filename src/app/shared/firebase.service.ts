import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

export interface HasKey {
    $key?: string;
    $exists?: string;
}

@Injectable()
export class FirebaseService<T extends HasKey> {
    public list: Observable<T[]>;

    private firebaseList: FirebaseListObservable<T[]>;
    public endpoint: string;



    constructor(private af: AngularFire) {

    }

    setup(endpoint: string, query?): Observable<T[]> {
        this.endpoint = endpoint;
        this.firebaseList = this.af.database.list(endpoint, query);
        this.list = this.firebaseList.map(rawTSet =>
            rawTSet.map(rawTData =>
                rawTData
            )
        );
        return this.list;
    }
    get(key): Observable<T> {
        let observer: FirebaseObjectObservable<T> = this.af.database.object(this.endpoint + key);
        return observer.map(item => {

            item.$key = key;
            return item
        });
    }
    new(item: T): any {
        let result = this.firebaseList.push(item);
        console.log(result);
        result.then(success => console.log("successfully added new item to " + this.endpoint, success), failure => console.log("failure", failure));
        return result;

    }

    // This method is fighting angularfire. HERE BE DRAGONS
    // I manually remove the key (which I need so I know where to write to),
    // and then add it back
    save(item: T): T {
        let key, exists;
        key = item.$key;
        delete item.$key;
        exists = item.$exists;
        delete item.$exists;
        if (key === 'new') {
            key = this.new(item).key;
        } else {
            this.af.database.object(this.endpoint + key).update(item);
        }
        item.$key = key;
        item.$exists = exists;
        return item;
    }

    delete(item: T) {
        let key = item.$key;
        if (key) {
            this.af.database.object(this.endpoint + key).remove();
        }

    }
}