import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Expert } from '../shared/models';
import { MD_SLIDE_TOGGLE_DIRECTIVES } from '@angular2-material/slide-toggle';

@Component({
    moduleId: module.id,
    selector: 'picker',
    template: `
    
    <div *ngIf="selected" style="border:1px solid #CCC;">
        <div>Current List</div>
        <div *ngFor="let item of selected">{{item.name}}  (<span (click)="delete(item)">x</span>)</div>
    </div>
    <button *ngIf="!showAvailable && available" (click)="showAdd()" type="button">Add New</button>
    <div *ngIf="showAvailable">
        <div>Available list:</div>
        <div *ngFor="let item of available | async" (click)="select(item)">{{item.name}}</div>
    </div>
    `,

})
export class PickerComponent {
    @Output() update = new EventEmitter<any[]>();
    @Input() available : Observable<any[]>;
    @Input() selected : any[];
    
    showAvailable : boolean = false;
    
    constructor() { }
    showAdd() {
        this.showAvailable = true;
    }
    select(item) {
        this.selected.push(item);
        this.update.emit(this.selected);
        this.showAvailable = false;
    }
    delete(item) {
        let pos = this.selected.indexOf(item);
        this.selected.splice(pos, 1);
        this.update.emit(this.selected);
        
    }
    

}