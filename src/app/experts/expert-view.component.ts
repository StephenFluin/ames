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
    selector: 'expert-detail',
    template: `
    <style>
    .expertLinks svg {
        vertical-align:middle;
        margin-right:4px;
    }
    .expertLinks a {
        margin-right:16px;
    }
    </style>
    <div *ngIf="expert" class="content">
        <img *ngIf="expert.picUrl" [src]="expert.picUrl" style="max-height:150px;max-width:150px;">
        <div><h1>{{expert.name }}</h1></div>
        <div>{{expert.location}}</div>
        <div class="expertLinks">
            <a *ngIf="expert.website" [href]="expert.website"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
            </svg>{{expert.website}}</a>
            <a *ngIf="expert.github" [href]="'https://github.com/' + expert.github"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
            </svg>{{expert.github}}</a>
            <a *ngIf="expert.twitter" [href]="'https://twitter.com/'+expert.twitter"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
            </svg>@{{expert.twitter}}</a>
            <a *ngIf="expert.linkedIn" [href]="'https://www.linkedin.com/in/'+expert.linkedIn"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
            </svg>LinkedIn</a>
            <a *ngIf="expert.email" [href]="'mailto:'+expert.email"><svg style="width:24px;height:24px" viewBox="0 0 24 24">
                <path fill="#000000" d="M20,8L12,13L4,8V6L12,11L20,6M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
            </svg> Email</a>
            <a ngLink=""></a>
            <hr>
            <div>
                <div>Biography</div>
                <div>{{expert.bio}}</div>
                <div *ngIf="expert.isConsultant">Avilable for Consulting</div>
                <div *ngIf="expert.isGDE"><a href="https://developers.google.com/experts/">GDE</a></div>

            </div>
            <div>
                <!-- @TODO figure out a way to list this developers' communities, events, mission participation -->
            </div>
        </div>
        <div>
            <h2>Content</h2>
            <p *ngIf="!expert.content">This developer has not yet provided any content.</p>
            <div class="content">
                <expert-content *ngFor="let content of expert.content | refirebase" [content]="content"></expert-content>
            </div>
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