import { Injectable } from '@angular/core';
import { Expert } from '../shared/models';
import { Observable } from 'rxjs';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

@Injectable()
export class ExpertService {
    public experts: Observable<Expert[]>;
    private firebaseExperts: FirebaseListObservable<any[]>;
    
    constructor(private af: AngularFire) {
        
        this.firebaseExperts = af.database.list('/experts');
        this.experts = this.firebaseExperts.map(
        expertsArray => {
            return expertsArray.map(
                expert => {
                 
                 expert.communities = Object.keys(expert.communities || {}).map(key => af.database.object(`/communities/${key}`));
                 return expert;
                }
            )
        });
        
    }
    
    get(key) : Observable<Expert> {
        return this.experts.map(experts => experts.find(expert => expert.$key == key));
    }
    
    new(item : Expert) : any  {
        console.log("Pushing new item into list");
        let result = this.firebaseExperts.push(item);
        return result;
       
        
    }
    
    save(expert : Expert) : Expert {
        if(expert.$key == 'new') {
            delete expert.$key;
            expert.$key = this.new(expert).key();
            
        } else {
            let key = expert.$key;
            delete expert.$key;
            this.af.database.object('/experts/' + key).update(expert);
        }
        return expert;
    }
    
}