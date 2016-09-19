import { Component, OnInit } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';

@Component({

    selector: 'resource-queue',
    templateUrl: 'resource-queue.component.html',
    styleUrls: ['../developers/expert-form.component.scss']
})
export class ResourceQueueComponent implements OnInit {
    submissions: FirebaseListObservable<any[]>;
    constructor(private af: AngularFire) {
        this.submissions = this.af.database.list('/queues/resources');


    }

    ngOnInit() { }

    accept(submission) {
        let master = this.af.database.list('/resources/' + submission.category + "/" + submission.subcategory + "/resources/");
        let key = submission.$key;
        delete submission.category;
        delete submission.subcategory;
        delete submission.$key;
        master.push(submission);
        this.submissions.remove(key);

    }
    reject(submission) {
        let key = submission.$key;

        this.submissions.remove(key);
    }

}
