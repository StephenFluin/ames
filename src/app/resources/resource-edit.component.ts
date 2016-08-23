import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute, Router } from '@angular/router';
import { ResourceFormComponent } from './resource-form.component';
import { Resource } from '../shared/models';
import { FirebaseService } from '../shared/firebase.service';
import { Observable } from 'rxjs/Rx';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({
    moduleId: module.id,
    template: `<h2>Edit Resource</h2>
     <resource-form [resource]="resource | async" (update)="save($event)" (delete)="delete($event)"></resource-form>
    `,
})
export class ResourceEditComponent {
    id: string;
    resource: Observable<any>;

    // Needs these to move / delete nodes appropriately between categories
    originalCategory: string;
    originalSubcategory: string;

    constructor(private route: ActivatedRoute, private router: Router, private resourceService: FirebaseService<Resource>, private af: AngularFire) {


        this.resource = route.params.flatMap(params => {
            if (params['id'] === "new") {
                return Observable.of({});
            }
            resourceService.setup('/resources/' + params["category"] + '/' + params["subcategory"] + '/resources/');
            console.log("bound to", '/resources/' + params["category"] + '/' + params["subcategory"] + '/resources/');
            return resourceService.get(params['id']).map(resource => {
                this.originalCategory = resource.category = params['category'];
                this.originalSubcategory = resource.subcategory = params['subcategory'];
                return resource;
            });
        });
    }

    /**
     * Edit might need to handle an update to an existing resource, or the moving between endpoints
     */
    save(resource) {
        let category = resource.category;
        let subcategory = resource.subcategory;
        let key = resource.$key;

        // We can only update if we have all 3
        if (category && subcategory && key) {
            delete resource.category;
            delete resource.subcategory;

            // Did it change?
            if (category != this.originalCategory || subcategory != this.originalSubcategory) {
                this.resourceService.delete(resource);

                delete resource.$key;

                let result = this.af.database.list(`/resources/${category}/${subcategory}/resources/`)
                    .push(resource);
                console.log(result.key);

                key = resource.$key = result.key;
            } else {
                this.resourceService.save(resource);// No need to delete, let's just update safely!
            }



            resource.category = category;
            resource.subcategory = subcategory;


            this.router.navigate([`/resources/${category}/${subcategory}/${key}`]);
        } else {
            this.router.navigate([`/resources/`]);

        }


    }
    delete(item) {

        this.resourceService.delete(item);
        this.router.navigate(['/resources'], { relativeTo: this.route });


    }

}