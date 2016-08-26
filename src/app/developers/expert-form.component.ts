import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Expert, Community } from '../shared/models';
import { PickerComponent } from '../shared/picker.component';
import { AuthService } from '../shared/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';


@Component({
    moduleId: module.id,
    selector: 'expert-form',
    template: `
    <form *ngIf="expert" (submit)="save(expert)" ngNoForm>
        <div><md-input placeholder="Name" [(ngModel)]="expert.name"></md-input></div>
        <div><md-input placeholder="Location" [(ngModel)]="expert.location"></md-input></div>
        <div><md-input placeholder="Bio" [(ngModel)]="expert.bio"></md-input></div>
        <div><md-input placeholder="Pic URL" [(ngModel)]="expert.picUrl"></md-input> <img *ngIf="expert.picUrl" [src]="expert.picUrl" style="max-height:1em;"></div>

        <div><md-input placeholder="Website" [(ngModel)]="expert.website"></md-input></div>
        <div><md-input placeholder="Twitter" [(ngModel)]="expert.twitter"></md-input></div>
        <div><md-input placeholder="Github Username" [(ngModel)]="expert.github"></md-input></div>
        <div><md-input placeholder="LinkedIn Username" [(ngModel)]="expert.linkedIn"></md-input></div>
        <!--<div>Communities</div>
        <picker [list]="'/communities/'" [order]="'name'" [selectedKeys]="expert.communities" (update)="chooseCommunities($event)"></picker>
        -->
        <fieldset class="content" style="padding:32px;">
            <legend>Content</legend>
            <style>
            expert-content:hover {background-color: #DDD;display:block;}</style>
            <expert-content *ngFor="let content of expert.content | refirebase" [content]="content" (click)="editContent(content)"></expert-content>
            <h3>New/Edit</h3>
            <div>
                <label>
                    Type
                    <select [(ngModel)]="newContent.type">
                        <option>Presentation</option>
                        <option>Blog Post</option>
                        <option>Other</option>
                    </select>
                </label>

                        
                <div><md-input placeholder="Title" placeholder="Content Title" [(ngModel)]="newContent.title"></md-input></div>
                <div><md-input placeholder="URL" placeholder="URL" [(ngModel)]="newContent.url"></md-input></div>
                <div class="options">
                    <button md-raised-button color="primary" type="button" (click)="createContent();">Create</button>
                </div>
            </div>

        </fieldset>

        <fieldset class="content" style="padding:32px;" *ngIf="auth.isAdmin | async">
            <legend><span class="adminIcon"></span>Admin</legend>
            <label>GDE? <md-slide-toggle name="isGDE" [(ngModel)]="expert.isGDE"></md-slide-toggle></label>
            <label>Consultant? <md-slide-toggle [(ngModel)]="expert.isConsultant"></md-slide-toggle></label>
            <label>Expert? <md-slide-toggle [(ngModel)]="expert.isExpert"></md-slide-toggle></label>
        </fieldset>

            
        

        <div class="options">
            <span (click)="deleteThis()" class="delete">delete</span>
            <button md-raised-button color="primary" type="submit" >Save</button>
        </div>
    </form>
        `,
})
export class ExpertFormComponent {
    @Output() update = new EventEmitter<Expert>();
    @Output() delete = new EventEmitter<Expert>();
    @Input() expert : Expert;

    newContent: {type: string,title: string,url: string, $key?: string} = {type:null,title:null,url:null};
    
    constructor(public auth : AuthService, public af : AngularFire) { }
    
    save(savedValue: Expert) {
        event.preventDefault();
        this.update.emit(savedValue);
    }

    deleteThis() {
        this.delete.emit(this.expert);
    }
    
    // Take a new emitted list of keys
    chooseCommunities(list : string[]) {
        console.log("Community List is now ",list);
        this.expert.communities = list;
    }

    createContent() {
        
        if(this.newContent.$key) {
            let contentObject = this.af.database.object('/users/' + this.expert.$key + '/content/' + this.newContent.$key);
            let key = this.newContent.$key;
            delete this.newContent.$key;
            contentObject.update(this.newContent);
            this.newContent.$key = key;
        } else {
            let contentList = this.af.database.list('/users/' + this.expert.$key + "/content/");
            contentList.push(this.newContent);
            this.newContent = {title:null,type:null,url:null};
        }
    }

    editContent(content) {
        console.log(content);
        this.newContent = content;
    }
    
    
}