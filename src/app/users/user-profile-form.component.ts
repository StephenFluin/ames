import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ROUTER_DIRECTIVES } from '@angular/router';



@Component({
    moduleId: module.id,
    selector: 'user-profile',
    template: `
    <div class="content" *ngIf="user">
        <div [title]="user.$key">Developer Type: <span>Standard</span></div>
        
        <label>Name <input [(ngModel)]="user.name" placeholder="name" ></label>
        <label>Bio <input [(ngModel)]="user.bio" placeholder="bio"></label>
        <button type="submit" (click)="save()">save</button>
        
    </div>
        `,
    styles: ['label input {display:block;margin-bottom:16px;}'],
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class UserProfileFormComponent {
    @Output() update = new EventEmitter<any>();
    @Input() user : any;
    
    save() {
        this.update.emit(this.user);
    }
}