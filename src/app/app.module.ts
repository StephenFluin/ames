import { NgModule, enableProdMode, ApplicationRef } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AmesAppComponent } from './ames.component';
import { FORM_DIRECTIVES, FormsModule } from '@angular/forms';
import { ROUTER_DIRECTIVES, provideRouter, RouterModule } from '@angular/router';
import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

import {  routes } from './routes';

import {RouterConfig} from '@angular/router';
import {HomeComponent} from './home.component';
import {MissionsComponent} from './missions/missions.component';
import {MissionListComponent} from './missions/mission-list.component';
import {MissionDetailComponent} from './missions/mission-detail.component';
import {MissionEditComponent} from './missions/mission-edit.component';
import {DevelopersComponent} from './experts/developers.component';
import {ExpertsComponent} from './experts/experts.component';
import {ExpertViewComponent} from './experts/expert-view.component';
import {ExpertEditComponent} from './experts/expert-edit.component';
import {EventsComponent} from './events/events.component';
import {EventSubmitComponent} from './events/event-submit.component';
import {EventEditComponent} from './events/event-edit.component';
import {EventViewComponent} from './events/event-view.component';

import {CommunitiesComponent} from './communities/communities.component';
import {CommunitySubmitComponent} from './communities/community-submit.component';
import {CommunityEditComponent} from './communities/community-edit.component';
import {CommunityViewComponent} from './communities/community-view.component';
import {LoginComponent} from './login.component';
import {ResourcesComponent} from './resources/resources.component';
import {ResourceEditComponent} from './resources/resource-edit.component';
import {ResourceQueueComponent} from './resources/resource-queue.component';
import {ResourceSubmitComponent} from './resources/resource-submit.component';
import {UserProfileComponent} from './users/user-profile.component';
import {UserProfileShortComponent} from './users/user-profile-short.component';
import {AdminComponent} from './admin.component';

// Non Routed
import {ExpertContentComponent} from './experts/expert-content.component';


@NgModule({
    // Add RouterModule
    declarations: [AmesAppComponent, 
    HomeComponent, MissionsComponent, MissionListComponent, MissionDetailComponent, MissionEditComponent, DevelopersComponent, ExpertsComponent, ExpertViewComponent, ExpertEditComponent, EventsComponent, EventSubmitComponent, EventEditComponent, EventViewComponent, CommunitiesComponent, CommunitySubmitComponent, CommunityEditComponent, CommunityViewComponent, LoginComponent, ResourcesComponent, ResourceEditComponent, ResourceQueueComponent, ResourceSubmitComponent, UserProfileComponent, UserProfileShortComponent, AdminComponent,
    // Non routed components
    ExpertContentComponent
    ],
    imports: [BrowserModule, RouterModule, FormsModule],
    entryComponents: [AmesAppComponent],
    providers: [
      provideRouter(routes),
      FIREBASE_PROVIDERS,
      defaultFirebase({
        apiKey: "AIzaSyCTOFGccvaEedz1Jykckni5T-WP7XixS_o",
        authDomain: "project-4800661445983438923.firebaseapp.com",
        databaseURL: "https://project-4800661445983438923.firebaseio.com/",
        storageBucket: "project-4800661445983438923.appspot.com",
      })
      
    ],  
  })
export class MyAppModule {
  constructor(private appRef : ApplicationRef) {
    appRef.bootstrap(AmesAppComponent);
  }
}