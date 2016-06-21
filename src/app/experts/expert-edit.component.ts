import { Component } from '@angular/core';
import { Expert } from '../shared/models';
import { ExpertFormComponent } from './expert-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router, ROUTER_DIRECTIVES } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    selector: 'expert-edit',
    template: `
    <h2> <a [routerLink]="['/experts']">Experts</a> &gt; <span *ngIf="(expert | async)?.$key=='new' && !(expert | async)?.firstName && !(expert | async)?.lastName">New Expert</span>{{(expert | async)?.firstName}} {{(expert | async)?.lastName}}</h2>
    <expert-form [expert]="expert | async" (update)="processUpdate($event)" (delete)="delete($event)"></expert-form>`,
    providers: [],
    directives: [ExpertFormComponent, ROUTER_DIRECTIVES],
    
})
export class ExpertEditComponent {
    expert : Observable<Expert>;
    id : string;
    
    constructor(private route : ActivatedRoute, private router: Router, private expertService : FirebaseService<Expert>) {
        expertService.setup('/experts/');
        this.expert = route.params.flatMap( params => {
            if(params['id'] == "new") {
                return Observable.of(new Expert());
            }
            return expertService.get(params['id'])
        });
    }
    
    processUpdate(expertUpdate : Expert) {
        console.log("Procsesing an update");
        this.expertService.save(expertUpdate);
        this.router.navigate(['/experts']);
    }
    delete(expert : Expert) {
        console.log("Processing delete");
        this.expertService.delete(expert);
        this.router.navigate(['/experts']);
    }
}