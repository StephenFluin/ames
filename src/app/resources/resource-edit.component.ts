import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResourceFormComponent } from './resource-form.component';
import { Resource } from '../shared/models';
import { FirebaseService, FirebaseTypedService } from '../shared/firebase.service';
import { Observable } from 'rxjs/Rx';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

@Component({

  templateUrl: 'resource-edit.component.html',
  styleUrls: ['../developers/expert-form.component.scss']
})
export class ResourceEditComponent {
    id: string;
    resource: Observable<any>;
    resourceService: FirebaseTypedService<Resource>;

    // Needs these to move / delete nodes appropriately between categories
    originalCategory: string;
    originalSubcategory: string;

    constructor(private route: ActivatedRoute, private router: Router, private fs: FirebaseService, private af: AngularFire) {


        this.resource = route.params.switchMap(params => {
            if (params['id'] === "new") {
                return Observable.of({});
            }
            this.resourceService = fs.attach<Resource>('/resources/' + params["category"] + '/' + params["subcategory"] + '/resources/');
            console.log("bound to", '/resources/' + params["category"] + '/' + params["subcategory"] + '/resources/');
            return this.resourceService.get(params['id']).map(resource => {
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
