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
    <div *ngIf="expert" class="content" style="display:flex;">
        <div style="display:flex;flex-direction:column;    justify-content: center;
    align-items: center;">
            <img [src]="expert.picUrl" style="max-height:150px;max-width:150px;">
            <div style="font-size:2em;font-weight:bold;">{{expert.name }}</div>
            <div> {{expert.location}}</div>
        </div>
        <div>
            <div>{{expert.bio}}</div>
            {{expert.resumeUrl}}
            <div *ngIf="expert.twitterID"><a [href]="'https://twitter.com/'+expert.twitterID">@{{expert.twitterID}}</a></div>

            <div *ngIf="expert.url"><a [href]="expert.url">{{expert.url}}</a></div>
            <div *ngIf="expert.isConsultant">Consultant</div>
            <div *ngIf="expert.isGDE">GDE</div>

        </div>
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
    expert: Expert;


    constructor(private route: ActivatedRoute, private expertService: FirebaseService<Expert>) {
        expertService.setup('/users/');


        // This calls .subscribe so we don't rely on the template for unrolling 
        // the observable (which requires 2 components)
        route.params.subscribe(params =>
            expertService.get(params['id']).subscribe((expert) => {
                this.expert = expert;
            })
        );
    }
}