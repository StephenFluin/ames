import { Component, Pipe, PipeTransform } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';
import { Resource } from '../shared/models';
import { ResourceFormComponent } from './resource-form.component'

@Component({
    moduleId: module.id,
    selector: 'resource-new',
    templateUrl: 'resource-submit.component.html',
    styleUrls: ['../developers/expert-form.component.css']
})
export class ResourceSubmitComponent {
    resource: Resource = new Resource();

    constructor(private af: AngularFire) { }

    save(item: Resource) {
        console.log("new resource submission", item);
        if (item.validate()) {
            delete item.$key;
            this.af.database.list('/queues/resources')
                .push(item);
            this.resource = new Resource();
        } else {
            console.warn('Invalid submission');
        }
    }


}
