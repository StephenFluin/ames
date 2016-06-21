import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './shared/auth.service';
import { FirebaseObjectObservable } from 'angularfire2';

@Component({
    moduleId: module.id,
    template: `<p>Angular is great, but we're only successful because we have an awesome community. This site is designed to help you find Experts, join a Group, or take on a Mission to help Angular.</p>
        `,
    directives: []
    
})
export class HomeComponent {
    content : string;
}
