import { Component, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'expert-content',
    templateUrl: 'expert-content.component.html',
    styleUrls: ['expert-content.component.css']
})
export class ExpertContentComponent {
    @Input() content : {type: string,title: string,url: string};

    constructor() { }



}
