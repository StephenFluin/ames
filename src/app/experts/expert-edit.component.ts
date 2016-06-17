import { Component } from '@angular/core';
import { Expert } from '../shared/models';
import { ExpertFormComponent } from './expert-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from '../shared/expert.service';

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
    
    constructor(private route : ActivatedRoute, private router: Router, private expertService : ExpertService) {
        this.expert = route.params.flatMap( params => {
            if(params['id'] == "new") {
                return Observable.of(new Expert());
            }
            return expertService.get(params['id'])
        });
    }
    
    processUpdate(expertUpdate : Expert) {
        let x = this.expertService.save(expertUpdate);
        this.router.navigate(['/experts']);
    }
}