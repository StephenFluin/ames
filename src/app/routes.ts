import {RouterConfig} from '@angular/router';
import {HomeComponent} from './home.component';
import {MissionsComponent} from './missions/missions.component';
import {MissionListComponent} from './missions/mission-list.component';
import {MissionDetailComponent} from './missions/mission-detail.component';
import {MissionEditComponent} from './missions/mission-edit.component';
import {DevelopersComponent} from './experts/developers.component';
import {ExpertsComponent} from './experts/experts.component';
import {ExpertEditComponent} from './experts/expert-edit.component';
import {EventsComponent} from './events/events.component';
import {EventSubmitComponent} from './events/event-submit.component';
import {EventEditComponent} from './events/event-edit.component';
import {CommunitiesComponent} from './communities/communities.component';
import {CommunitySubmitComponent} from './communities/community-submit.component';
import {CommunityEditComponent} from './communities/community-edit.component';
import {LoginComponent} from './login.component';
import {ResourcesComponent} from './resources/resources.component';
import {ResourceEditComponent} from './resources/resource-edit.component';
import {ResourceQueueComponent} from './resources/resource-queue.component';
import {ResourceSubmitComponent} from './resources/resource-submit.component';
import {UserProfileComponent} from './users/user-profile.component';
import {AdminComponent} from './admin.component';


export const routes: RouterConfig = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'missions',
        component: MissionsComponent,
        children: [
            { path: '', component: MissionListComponent },
            { path: ':id', component: MissionDetailComponent },
            { path: ':id/edit', component: MissionEditComponent },
        ]
    },
    { path: 'developers', component: DevelopersComponent },
    { path: 'experts', component: ExpertsComponent },
    { path: 'experts/:id/edit', component: ExpertEditComponent },
    { path: 'events', component: EventsComponent },
    { path: 'events/submit', component: EventSubmitComponent },
    { path: 'events/:id/edit', component: EventEditComponent },
    { path: 'communities', component: CommunitiesComponent, },
    { path: 'communities/:submit', component: CommunitySubmitComponent },
    { path: 'communities/:id/edit', component: CommunityEditComponent },
    { path: 'login', component: LoginComponent },
    { path: 'resources', component: ResourcesComponent },
    { path: 'resources/submit', component: ResourceSubmitComponent },
    { path: 'resources/queue', component: ResourceQueueComponent },
    { path: 'resources/:category/:subcategory/:id', component: ResourceEditComponent },
    { path: 'profile', component: UserProfileComponent },
    { path: 'admin', component: AdminComponent },
];