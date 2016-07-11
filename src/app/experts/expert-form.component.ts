import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Expert, Community } from '../shared/models';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';
import { PickerComponent } from '../shared/picker.component';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';

import { AuthService } from '../shared/auth.service';


@Component({
    moduleId: module.id,
    selector: 'expert-form',
    template: `
    <form *ngIf="expert" (submit)="save(expert)" ngNoForm>
        <label>Name <input name="name" [(ngModel)]="expert.name"></label>
        <div *ngIf="!expert.name && (expert.firstName || expert.lastName ) ">{{expert.firstName}} {{expert.lastName}}</div>
        <label>Twitter <input [(ngModel)]="expert.twitterID"></label>
        <label>Bio <input [(ngModel)]="expert.bio"></label>
        <label>URL<input [(ngModel)]="expert.url"></label>
        <label>Blog URL<input [(ngModel)]="expert.blogUrl"></label>
        <label>Pic URL <img *ngIf="expert.picUrl" [src]="expert.picUrl" style="max-height:1em;"> <input [(ngModel)]="expert.picUrl"></label>
        <label>Resume URL <input [(ngModel)]="expert.resumeUrl"></label>
        <label>LinkedIn <input [(ngModel)]="expert.linkedIn"></label>
        <div>Communities</div>
        <picker [list]="'/communities/'" [order]="'firstName'" [selectedKeys]="expert.communities" (update)="chooseCommunities($event)"></picker>
        
        <fieldset class="content" style="padding:32px;" *ngIf="auth.isAdmin | async">
            <legend><span class="adminIcon"></span>Admin</legend>
            <label>GDE? <md-slide-toggle [(ngModel)]="expert.isGDE"></md-slide-toggle></label>
            <label>Consultant? <md-slide-toggle [(ngModel)]="expert.isConsultant"></md-slide-toggle></label>
            <label>Expert? <md-slide-toggle [(ngModel)]="expert.isExpert"></md-slide-toggle></label>
        </fieldset>
            
        
        <button type="submit">Save</button>
        <button (click)="deleteExpert()" type="button">DELETE</button>
    </form>
        `,
    styles: [],
    directives: [ ROUTER_DIRECTIVES, MD_SLIDE_TOGGLE_DIRECTIVES, PickerComponent ],
    
})
export class ExpertFormComponent {
    @Output() update = new EventEmitter<Expert>();
    @Output() delete = new EventEmitter<Expert>();
    @Input() expert : Expert;
    
    constructor(private auth : AuthService) { }
    
    save(savedValue: Expert) {
        event.preventDefault();
        this.update.emit(savedValue);
    }

    deleteExpert() {
        this.delete.emit(this.expert);
    }
    
    // Take a new emitted list of keys
    chooseCommunities(list : string[]) {
        console.log("Community List is now ",list);
        this.expert.communities = list;
    }
    
    
}