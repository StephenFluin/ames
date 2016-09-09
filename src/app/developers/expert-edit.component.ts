import { Component } from '@angular/core';
import { Expert } from '../shared/models';
import { ExpertFormComponent } from './expert-form.component';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../shared/firebase.service';
import { AngularFire } from 'angularfire2';

@Component({
    moduleId: module.id,
    selector: 'expert-edit',
    templateUrl: 'expert-edit.component.html',
    styleUrls: ['expert-edit.component.css']
})
export class ExpertEditComponent {
    expert: Observable<Expert>;
    id: string;

    constructor(private route: ActivatedRoute, private router: Router, private expertService: FirebaseService<Expert>, private af: AngularFire) {
        expertService.setup('/users/');
        this.expert = route.params.flatMap(params => {
            if (params['id'] == "new") {
                return Observable.of(new Expert());
            }
            return expertService.get(params['id']);
        });
    }

    processUpdate(expertUpdate: Expert) {
        this.expertService.save(expertUpdate);
        let expertStatus = this.af.database.object("/experts/" + expertUpdate.$key);
        try {
            if (expertUpdate.isExpert) {
                console.log("set expert status to true");
                expertStatus.set(true);
            } else {
                console.log("delete expert status");
                expertStatus.remove();
            }
        } catch (ex) {
            console.error(ex);
        }

        this.router.navigate(['/developers']);
    }
    delete(expert: Expert) {
        this.expertService.delete(expert);
        this.router.navigate(['/developers']);
    }
}
