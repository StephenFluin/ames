import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Expert } from '../shared/models';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

export interface HasKey {
    $key: string;
}

/**
 * I'm going to try to make this an opinionated picker
 * It requires that you give it an observable of options
 * and an array of selected items or selected item keys.
 * These keys are compared against the $key property of
 * each option.
 */
@Component({

    selector: 'picker',
    templateUrl: 'picker.component.html',
    styleUrls: ['picker.component.scss', '../developers/expert-form.component.scss']

})
export class PickerComponent implements OnInit {
    // Send back a firebase style object with {key=>true,key2=>true}
    @Output() update = new EventEmitter<any>();
    // Name of Firebase endpoint that has the options
    @Input() list: string;
    @Input() order: string;

    // An array of objects (auto-genned from selectedKeys if not provided)
    @Input() selected: any[];
    // An array of string keys
    @Input() selectedKeys: any;
    @Input() selectedObservable: Observable<any>;

    @Input() singleMode: boolean = false;
    @Input() confirmDelete: boolean = false;

    showAvailable: boolean = false;

    available: Observable<HasKey[]>;

    constructor(private af: AngularFire) {

    }
    ngOnInit() {
        // retreive the configuration for available options and lookup in fb
        this.available = this.af.database.list(this.list, { query: { orderByChild: this.order } }).cache(1);
        if (!this.selected) {
            this.selected = [];
        }
        // Populate selected if a key list was provided
        if (this.selectedKeys) {
            this.processSelectedKeys(this.selectedKeys);
        }

        // Could this be made reactive properly?
        if (this.selectedObservable) {
            this.selectedObservable.subscribe(n => {
                this.processSelectedKeys(n);
            })
        }
    }
    processSelectedKeys(keySource: any) {
        //console.log("using selectedKeys");

        let keys = Object.keys(keySource);

        this.available.subscribe(list => {
            this.selected = [];
            //console.log("just got a list out!");
            list.map(next => {


                if (keys.indexOf(next.$key) > -1 && this.selected.indexOf(next) < 0) {
                    this.selected.push(next);
                    //console.log("Adding ", next['name'], " to selected object.");
                } else {
                    //console.log("not adding ", next['name'] , " to selected object.");
                }
            })
        });
    }
    showAdd() {
        this.showAvailable = true;
    }
    select(item) {
        if (this.selected.indexOf(item) < 0) {
            this.selected.push(item);
        }
        this.update.emit(this.convertToMap(this.selected));
        this.showAvailable = false;
    }
    delete(item) {
        let result = true;
        if(this.confirmDelete) {
            result = confirm("Are you sure you would like to delete this?");
        }
        if(result) {
            let pos = this.selected.indexOf(item);
            this.selected.splice(pos, 1);
            this.update.emit(this.convertToMap(this.selected));
        }

    }
    convertToMap(list: any[]) {
        let result = {};
        console.log("Turning ", list, " into a map of keys.");
        for (let item of list) {
            result[item.$key] = true;
        }
        console.log("I created:", result);
        return result;
    }


}
