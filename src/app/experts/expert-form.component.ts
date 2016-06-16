import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { Expert } from '../shared/models';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'expert-form',
    template: `<h2> <a [routerLink]="['/experts']">Experts</a> &gt; <span *ngIf="expert?.$key=='new' && !expert?.firstName && !expert?.lastName">New Expert</span>{{expert?.firstName}} {{expert?.lastName}}</h2>
    <form *ngIf="expert" (submit)="save(expert)">
        <label>First Name <input name="firstName" [(ngModel)]="expert.firstName"></label>
        <label>Last name <input [(ngModel)]="expert.lastName"></label>
        <label>Twitter <input [(ngModel)]="expert.twitterID"></label>
        <label>Description <input [(ngModel)]="expert.bio"></label>
        <label>URL<input [(ngModel)]="expert.url"></label>
        <label>Blog URL<input [(ngModel)]="expert.blogUrl"></label>
        <label>Pic URL <img *ngIf="expert.picUrl" [src]="expert.picUrl" style="max-height:1em;"> <input [(ngModel)]="expert.picUrl"></label>
        <label>Resume URL <input [(ngModel)]="expert.resumeUrl"></label>
        
        <label>Email <input [(ngModel)]="expert.eMail"></label>
        
        <label>GDE? <input [(ngModel)]="expert.isGDE"></label>
        
        <label>LinkedIn<input [(ngModel)]="expert.linkedIn"></label>
        <label>ngConsult <input [(ngModel)]="expert.ngConsult"></label>
        <label>Phone <input [(ngModel)]="expert.phone"></label>
        
        <button type="submit">Save</button>
    </form>
        `,
    styles: ['label input {display:block;margin-bottom:16px;min-width:50%;}'],
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class ExpertFormComponent {
    @Output() update = new EventEmitter<Expert>();
    @Input() expert : Expert;
    
    save(savedValue: Expert) {
        console.log("Processing save for", savedValue);
        this.update.emit(savedValue);
        
        
    }
}