import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MissionService } from './shared/mission.service';
import { AuthService } from './shared/auth.service';

@Component({
  moduleId: module.id,
  selector: 'ames-app',
  templateUrl: 'ames.component.html',
  styleUrls: ['ames.component.css'],
  directives: [ROUTER_DIRECTIVES],
  providers: [MissionService, AuthService],
})
export class AmesAppComponent {
  title = 'Ames';
}
