import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';

@Component({
    moduleId: module.id,
    selector: 'resource-queue',
    template: `<h2>Resource Queue</h2>
    <div class="content">
        <div *ngFor="let submission of submissions | async">
            <h3>{{submission.title}} ({{submission.selectedCategory}} / {{submission.selectedSubcategory}})</h3>
            <p><a [href]="submission.url">{{submission.url}}</a></p>
            <p>{{submission.desc}}</p>
            <button (click)="accept(submission)">accept</button> <button (click)="reject(submission)">reject</button>
        </div>
    </div>
    
    `
})
export class ResourceQueueComponent implements OnInit {
    submissions : FirebaseListObservable<any[]>;
    constructor(private af : AngularFire) { 
        this.submissions = this.af.database.list('/resource-queue');
        

    }

    ngOnInit() { }
    
    accept(submission) {
        let master = this.af.database.list('/resources/' + submission.selectedCategory + "/" + submission.selectedSubcategory + "/resources/");
        let key = submission.$key;
        delete submission.selectedCategory;
        delete submission.selectedSubcategory;
        delete submission.$key;
        master.push(submission);
        this.submissions.remove(key);
        
    }
    reject(submission) {
        let key = submission.$key;
        
        this.submissions.remove(key);
    }

}