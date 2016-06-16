import { Component } from '@angular/core';
import { Expert } from '../shared/models';
import { ExpertFormComponent } from './expert-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    selector: 'expert-edit',
    template: `<expert-form [expert]="expert | async" (update)="processUpdate($event)"></expert-form>`,
    providers: [],
    directives: [ExpertFormComponent],
    
})
export class ExpertEditComponent {
    expert : Observable<Expert>;
    id : string;
    
    constructor(private route : ActivatedRoute, private router: Router, private expertService : FirebaseService<Expert>) {
        expertService.setup('/experts/', Expert);
        route.params.subscribe(params => {
            
            this.id = params['id'];
            if(this.id == 'new') {
                this.expert = Observable.create(observer => {
                    observer.next(new Expert());
                   
                });
            } else {
                let experts = expertService.getList();
                this.expert = experts.map( ExpertList => ExpertList.find(expert => expert.$key == this.id));
            }
            
            
        }, params => {
            console.log("error", params);
        }, () => {
            console.log("finished");
        });
    }
    
    processUpdate(expertUpdate : Expert) {
        this.expertService.save(expertUpdate)
        .then(success => this.router.navigate(['/experts/']));
    }
}