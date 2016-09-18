import { Component, Pipe, PipeTransform } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';
import { AuthService } from '../shared/auth.service';

declare var firebase: any;
declare var prompt;

@Component({
    selector: 'resources',
    templateUrl: 'resources.component.html',
    styleUrls: [ '../developers/expert-form.component.scss', 'resources.component.scss'],
})
export class ResourcesComponent {
    data: Observable<any[]>;
    priority: number;

    constructor(public af: AngularFire, public auth: AuthService) {
        this.data = af.database.list('/resources').share();

    }
    setCategoryPriority(category, priority: number) {
        firebase.database().ref('/resources/' + category).setPriority(priority);
        this.priority = null;

    }
    setSubcategoryPriority(category, subcategory, priority: number) {
        firebase.database().ref('/resources/' + category + '/' + subcategory).setPriority(priority);
        this.priority = null;

    }


}
