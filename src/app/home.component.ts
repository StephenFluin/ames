import { Component, OnInit } from '@angular/core';


@Component({
    template: 'SUBCOMPONENT',
    selector: 'subcomponent'
})
export class SubComponent {
    
}

@Component({
    moduleId: module.id,
    template: `Just hold on, we're going home.
    
   <p [innerHTML]="content">Let's bind this.</p>
   {{content}}
   <p></p>
   <div>safe thing:</div>
   <div><subcomponent></subcomponent></div>
    `,
    directives: [SubComponent]
    
})
export class HomeComponent implements OnInit {
    content : string;
    
    ngOnInit() {
        this.content = `<strong>Hi!</strong>
        <script   src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="   crossorigin="anonymous"></script>
        That got squelched!
        <subcomponent></subcomponent>`;
    }
}
