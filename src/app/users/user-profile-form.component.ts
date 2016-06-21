import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ROUTER_DIRECTIVES } from '@angular/router';



@Component({
    moduleId: module.id,
    selector: 'user-profile',
    template: `
    <p>User Profile</p>
    <div class="content" *ngIf="user">
        <div>UID: {{user.$key}}</div>
        <div>Name: {{user.name}}</div>
        <input [(ngModel)]="user.name" placeholder="name">
        <input [(ngModel)]="user.bio" placeholder="bio">
        <button type="submit" (click)="save()">save</button>
        
    </div>
        `,
    styles: ['label input {display:block;margin-bottom:16px;}'],
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class UserProfileFormComponent {
    @Output() update = new EventEmitter<any>();
    @Input() user : any;
    
    constructor() {
        console.log("user is",this.user);
    }
    
    save() {
        this.update.emit(this.user);
    }
}