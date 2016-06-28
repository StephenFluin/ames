import { Component, Pipe, PipeTransform } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';

declare var firebase : any;
declare var prompt;

@Component({
  moduleId: module.id,
  selector: 'resources',
  template: `
  <h2>Resources</h2>
<p>
    <a [routerLink]="['/resources/new']">Submit a New Resource</a>
</p>
<div *ngFor="let category of data | async" style="margin-left:16px;clear:both;">
    <h3>{{category.$key}} <button (click)="setCategoryPriority(category.$key,priority)">SetPriority</button><input [(ngModel)]="priority"></h3>
    <div style="display:flex;">
        <div *ngFor="let sub of category | refirebase" style="margin-left:16px;margin-bottom:32px;">
            <h4>{{sub.$key}}</h4>
            <h4><button (click)="setSubcategoryPriority(category.$key, sub.$key,subPriority)">SetPriority</button><input [(ngModel)]="subPriority"></h4>
            <div *ngFor="let resource of sub.resources | refirebase" style="margin-left:16px;">
                <a target="_blank" [href]="resource.url">{{resource.title}}</a> 
                <span *ngIf="!resource.rev">(Awaiting Approval!)</span>
            </div>
        </div>
    </div> 
</div>`,
  directives: [ ...MD_BUTTON_DIRECTIVES, ...MD_TOOLBAR_DIRECTIVES, ...MD_INPUT_DIRECTIVES, ...ROUTER_DIRECTIVES ],
  pipes: [ RefirebasePipe ]
})
export class ResourcesComponent {
  data : Observable<any[]>;
  priority : number;
  
  constructor(private af: AngularFire) {
    this.data = af.database.list('/resources').share();
   
  }
  setCategoryPriority(category, priority: number) {
    //this.af.database.object('/resources/'+category);
    console.log(firebase.database().ref('/resources/'+category));
    firebase.database().ref('/resources/'+category).setPriority(priority);
    this.priority = null;
    
  }
  setSubcategoryPriority(category, subcategory, priority: number) {
    //this.af.database.object('/resources/'+category);
    console.log(firebase.database().ref('/resources/'+category+'/'+subcategory));
    firebase.database().ref('/resources/'+category+'/'+subcategory).setPriority(priority);
    this.priority = null;
    
  }
  
  
}