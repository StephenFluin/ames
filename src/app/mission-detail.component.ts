import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, ActivatedRoute } from '@angular/router';
import { Mission } from './models';

@Component({
    moduleId: module.id,
    template: `Mission Detail
    `,
    
})
export class MissionDetailComponent {
    constructor(private route : ActivatedRoute) {
        route.params.subscribe(params => {
            // Why is this an observable vs an object? :(
                
        }, params => {
            console.log("error", params);
        }, () => {
            console.log("finished");
        });
    }
    
}