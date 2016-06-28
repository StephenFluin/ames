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
    directives: [ ROUTER_DIRECTIVES, ResourceFormComponent ],
    
})
export class ResourceEditComponent {
    id : string;
    resource : Observable<any>;
    
    constructor(private route : ActivatedRoute, private router: Router, private resourceService : FirebaseService<Resource>, private af : AngularFire) {
        
        
        this.resource = route.params.flatMap( params => {
            if(params['id'] === "new") {
                console.log("Generating a new resource");
                return Observable.of({});
            }
            resourceService.setup('/resources/'+params["category"]+'/'+params["subcategory"]+'/resources/');
            console.log("bound to",'/resources/'+params["category"]+'/'+params["subcategory"]+'/resources/');
            return resourceService.get(params['id']).map(resource => {
                resource.category = params['category'];
                resource.subcategory = params['subcategory'];
                console.log("Resolving a resource that looks like",resource)
                return resource;
            });
        });
        route.params.subscribe(next => this.id=next['id'], error => console.error(error), () => console.log('finished'));
    }
    
    /**
     * Edit might need to handle an update to an existing resource, or the moving between endpoints
     */
    save(resource) {
        console.log("saving from component",resource);
        
        let category = resource.category;
        let subcategory = resource.category;
        let key = resource.$key;
        if(category && subcategory && key) {
            delete resource.category;
            delete resource.subcategory;
            delete resource.$key;
            //this.resourceService.delete(resource);
            console.log(resource);
            this.af.database.object(`/resources/${category}/${subcategory}/resources/${key}`)
            .update(resource);
            this.router.navigate([`/resources/${category}/${subcategory}/${key}`]);
        } else {
            this.router.navigate([`/resources/`]);
            
        }
        
        
    }
    delete(mission) {
        this.resourceService.delete(mission);
        this.router.navigate(['../../'], {relativeTo:this.route});
        
        
    }
    
}