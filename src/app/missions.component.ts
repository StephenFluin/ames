import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
    moduleId: module.id,
    template: `Missions!
      <div><a [routerLink]="['/missions/23']">Mission 23</a></div>
    <router-outlet></router-outlet>
    `,
    directives: [ ROUTER_DIRECTIVES ],
    
})
export class MissionsComponent {
    
}