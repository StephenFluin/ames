import { Component, Pipe, PipeTransform } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { RefirebasePipe } from '../shared/refirebase.pipe';
import { AuthService } from '../shared/auth.service';

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
    <h3>{{category.$key}}</h3>
    <div *ngIf="auth.isAdmin | async"> <button (click)="setCategoryPriority(category.$key,priority)">SetPriority</button><input [(ngModel)]="priority"/></div>
    <div style="display:flex;">
        <div *ngFor="let sub of category | refirebase" style="margin-left:16px;margin-bottom:32px;">
            <h4>{{sub.$key}}</h4>
            <h4 *ngIf="auth.isAdmin | async"><button (click)="setSubcategoryPriority(category.$key, sub.$key,subPriority)">SetPriority</button><input [(ngModel)]="subPriority"></h4>
            <div *ngFor="let resource of sub.resources | refirebase" style="margin-left:16px;">
                <a target="_blank" [href]="resource.url">{{resource.title}}</a> <a [routerLink]="['/resources/',category.$key,'/',sub.$key,'/',resource.$key]" *ngIf="auth.isAdmin | async"><svg style="width:12px;height:12px" viewBox="0 0 24 24">
    <path fill="#000000" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
</svg></a>
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
  
  constructor(private af: AngularFire, private auth : AuthService) {
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