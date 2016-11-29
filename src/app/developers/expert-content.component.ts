import { Component, Input } from '@angular/core';

@Component({

    selector: 'expert-content',
    templateUrl: './expert-content.component.html',
    styleUrls: ['./expert-content.component.scss']
})
export class ExpertContentComponent {
    @Input() content: { type: string, title: string, url: string };

    constructor() { }

}
