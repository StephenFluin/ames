import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FirebaseService } from './shared/firebase.service';
import { UserLoginComponent } from './users/user-login.component';

import { AuthService } from './shared/auth.service';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

@Component({
  moduleId: module.id,
  selector: 'ames-app',
  templateUrl: 'ames.component.html',
  directives: [ROUTER_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, UserLoginComponent],
  providers: [AuthService, FirebaseService],
})
export class AmesAppComponent {
  title = 'Ames';
  
  // Remove if/when https://github.com/angular/angular/issues/8357 is fixed 
  constructor(private router : Router ) {}
  home() {
    this.router.navigate(['/']);
  }
}
