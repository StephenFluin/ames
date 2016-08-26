import { Component, Pipe, PipeTransform } from '@angular/core';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';
import { AuthService } from '../shared/auth.service';

declare var firebase: any;
declare var prompt;

@Component({
  moduleId: module.id,
  selector: 'resources',
  templateUrl: 'resources.component.html',
  styleUrls: ['resources.component.css'],
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
