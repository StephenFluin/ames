import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Expert } from '../shared/models';

import { FirebaseService } from '../shared/firebase.service';

@Component({
    moduleId: module.id,
    template: `<h2>Experts</h2>
    
    <div *ngFor="let expert of experts | async" class="card" style="float:left;height:200px;">
        <section>
            <div>{{expert.firstName}} {{expert.lastName}}</div>
            <div>{{expert.bio}}</div>
            <div>{{expert.webpage}}</div>
        </section>
        <section *ngIf="auth.isAdmin">
            <button md-button-raised (click)="edit(community)">Edit</button>
        </section>
    </div>
    
    `,
    
})
export class ExpertsComponent {
    experts;
    auth;
    
    constructor(private router: Router, private expertService : FirebaseService<Expert>) {
        expertService.setup('/experts/', Expert);
        this.experts = expertService.getList();
        this.experts.subscribe(next => console.log(next), error => console.log(error), () => console.log('finished'));
        this.auth = {isAdmin: true};
    }
    
    edit(community) {
        this.router.navigate(['/communities/',community.$key,'/edit']);
    }
}