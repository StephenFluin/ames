import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx'; // load the full rxjs
import { Community } from '../shared/models';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: 'community-form',
    template: `<h2> <a [routerLink]="['/communities']">Communities</a> &gt; {{community?.name}}</h2>
    <form *ngIf="community" (submit)="save()">
        <label>Name <input [(ngModel)]="community.name"></label>
        <label>Description <input [(ngModel)]="community.description"></label>
        <label>Location <input [(ngModel)]="community.location"></label>
        <label>Organizer <input [(ngModel)]="community.organizer"></label>
        <label>Span<input [(ngModel)]="community.span"></label>
        <label>URL<input [(ngModel)]="community.url"></label>
        <label>Type<input [(ngModel)]="community.type"></label>
        <button type="submit">Save</button>
        <button (click)="deleteCommunity()" type="button">DELETE</button>
    </form>
        `,
    styles: ['label input {display:block;margin-bottom:16px;}'],
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class CommunityFormComponent {
    @Output() update = new EventEmitter<Community>();
    @Output() delete = new EventEmitter<Community>();
    @Input() community : Community;
    
    save() {
        this.update.emit(this.community);
    }
    deleteCommunity() {
        this.delete.emit(this.community);
    }
}