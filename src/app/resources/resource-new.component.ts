import { Component, Pipe, PipeTransform } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';
import { Resource } from '../shared/models';
import { ResourceFormComponent } from './resource-form.component'

@Component({
    moduleId: module.id,
    selector: 'resource-new',
    template: `
  
  <style>
  md-input { display:block;margin:32px 0;}
  select {
    height:32px;
    margin: 16px 0;
  }
 </style>
 <h2>Submit a New Resource</h2>
 <p>Want to add a resource to our Angular 2 listings?  Submit your information here, we'll review and give you a head's up when we add it to the list.</p>
 <resource-form [resource]="{}" (update)="save($event)" (delete)="delete($event)"></resource-form>
  
  `,
    directives: [...MD_BUTTON_DIRECTIVES, ...MD_TOOLBAR_DIRECTIVES, ...MD_INPUT_DIRECTIVES, ResourceFormComponent],
    pipes: [RefirebasePipe]
})
export class ResourceNewComponent {
    resource: Resource = new Resource();

    constructor(private af: AngularFire) {}

    save(item: Resource) {
        this.af.database.list('/resource-queue/')
            .push(item);
        this.resource = new Resource();
    }


}