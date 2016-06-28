import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { FirebaseService } from './shared/firebase.service';
import { UserLoginComponent } from './users/user-login.component';

import { AuthService } from './shared/auth.service';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

// Router Resolution Helpers, coppied from routes.ts
import {HomeComponent} from './home.component';
import {MissionsComponent} from './missions/missions.component';
import {MissionListComponent} from './missions/mission-list.component';
import {MissionDetailComponent} from './missions/mission-detail.component';
import {MissionEditComponent} from './missions/mission-edit.component';
import {ExpertsComponent} from './experts/experts.component';
import {ExpertEditComponent} from './experts/expert-edit.component';
import {CommunitiesComponent} from './communities/communities.component';
import {LoginComponent} from './login.component';
import {ResourcesComponent} from './resources/resources.component';
import {ResourceEditComponent} from './resources/resource-edit.component';
import {ResourceQueueComponent} from './resources/resource-queue.component';
import {ResourceNewComponent} from './resources/resource-new.component';
import {CommunityEditComponent} from './communities/community-edit.component';
import {UserProfileComponent} from './users/user-profile.component';
import {AdminComponent} from './admin.component';

@Component({
  moduleId: module.id,
  selector: 'ames-app',
  templateUrl: 'ames.component.html',
  directives: [ROUTER_DIRECTIVES, MD_TOOLBAR_DIRECTIVES, UserLoginComponent],
  providers: [AuthService, FirebaseService],
  precompile: [
    HomeComponent,
    MissionsComponent,
    MissionListComponent,
    MissionDetailComponent,
    MissionEditComponent,
    ExpertsComponent,
    ExpertEditComponent,
    CommunitiesComponent,
    LoginComponent,
    ResourcesComponent,
    ResourceEditComponent,
    ResourceQueueComponent,
    ResourceNewComponent,
    CommunityEditComponent,
    UserProfileComponent,
    AdminComponent,
    
  ],
})
export class AmesAppComponent {
  title = 'Ames';
  
  
  constructor(private router : Router ) {}
  // Remove if/when https://github.com/angular/angular/issues/8357 is fixed 
  home() {
    this.router.navigate(['/']);
  }
}
