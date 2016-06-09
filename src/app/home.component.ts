import { Component, OnInit } from '@angular/core';


@Component({
    template: 'SUBCOMPONENT',
    selector: 'subcomponent'
})
export class SubComponent {
    
}

@Component({
    moduleId: module.id,
    template: `<p>Angular is great, but we're only successful because of our awesome community. This site is designed to help you find Experts, join a Group, or take on a Mission to help Angular.</p>

    `,
    directives: [SubComponent]
    
})
export class HomeComponent implements OnInit {
    content : string;
    
    ngOnInit() {
    }
}
