import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';

@Component({
  moduleId: module.id,
  selector: 'resources',
  templateUrl: 'resources.component.html',
  directives: [ ...MD_BUTTON_DIRECTIVES, ...MD_TOOLBAR_DIRECTIVES, ...MD_INPUT_DIRECTIVES, ...ROUTER_DIRECTIVES ],
  pipes: [ RefirebasePipe ]
})
export class ResourcesComponent implements OnInit {
  data : Observable<any[]>;
  
  constructor(private af: AngularFire) {
    this.data = af.database.list('/resources').share();
   
  }
  
  ngOnInit() {
    
  }
  
  
}