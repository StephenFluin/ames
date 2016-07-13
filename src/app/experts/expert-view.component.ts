import { Component } from '@angular/core';
import { Expert } from '../shared/models';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { FireJoinPipe } from '../shared/fire-join.pipe';


/**
 * Render a view of a expert here
 */
@Component({
    moduleId: module.id,
    selector: 'expert-view',
    template: `
    <div *ngIf="expert" class="content">
        <img [src]="expert.picUrl" style="max-height:50px;max-width:50px;">
        <h2>{{expert.name }}</h2>
        <div><strong>Location:</strong> {{expert.location}}</div>
    </div>
    <div *ngIf="!expert">
        <p>Expert not found.</p>
    </div>
    `,
    providers: [],
    pipes: [FireJoinPipe],
    directives: [],
    
})
export class ExpertViewComponent {
    expert : Expert;
    
    constructor(private route : ActivatedRoute, private expertService : FirebaseService<Expert>) {
        expertService.setup('/users/');
        
        
        // This calls .subscribe so we don't rely on the template for unrolling 
        // the observable (which requires 2 components)
       route.params.subscribe( params =>
            expertService.get(params['id']).subscribe((expert) => {
                 this.expert = expert;
            })
        );
    }
}