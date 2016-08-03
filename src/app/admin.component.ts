import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Observable } from 'rxjs/Rx';


import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import { PickerComponent } from './shared/picker.component';
import { FirebaseService } from './shared/firebase.service';

@Component({
    moduleId: module.id,
    selector: 'login',
    template: `
    <h2>Manage Administrators</h2>
    <form *ngIf="auth.isAdmin | async">
        <picker
            [list]="'/users'"
            [selectedObservable]="admins"
            [order]="name"
            (update)="update($event)"></picker>
    </form>
    
    
    `,
    directives: [PickerComponent],

})
export class AdminComponent {
    available: Observable<any>;
    admins: FirebaseObjectObservable<any>;
    newData;

    constructor(public auth: AuthService, public adminService: FirebaseService<any>, public af: AngularFire) {
        this.admins = af.database.object('/admin/');
    }

    update(adminList) {
        console.log("new Admin list", adminList);
        if (adminList) {
            delete adminList.$key;
            console.log("saving on admin page", adminList);
            this.admins.set(adminList);
        }
    }

}