import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    template: `<h2><a [routerLink]="['/missions/']">Missions</a> - </h2>
    <router-outlet></router-outlet>
    `,
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class MissionsComponent {
    
}