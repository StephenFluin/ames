import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'ames-app',
  templateUrl: 'ames.component.html',
  styleUrls: ['ames.component.css'],
  directives: [ROUTER_DIRECTIVES]
})
export class AmesAppComponent {
  title = 'Ames';
}
