import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { MissionsComponent } from './missions/missions.component';
import { MissionListComponent } from './missions/mission-list.component';
import { MissionDetailComponent } from './missions/mission-detail.component';
import { MissionEditComponent } from './missions/mission-edit.component';
import { DevelopersComponent } from './developers/developers.component';
import { ExpertsComponent } from './developers/experts.component';
import { ExpertViewComponent } from './developers/expert-view.component';
import { ExpertEditComponent } from './developers/expert-edit.component';
import { EventsComponent } from './events/events.component';
import { EventSubmitComponent } from './events/event-submit.component';
import { EventEditComponent } from './events/event-edit.component';
import { EventViewComponent } from './events/event-view.component';
import { CommunitiesComponent } from './communities/communities.component';
import { CommunitySubmitComponent } from './communities/community-submit.component';
import { CommunityEditComponent } from './communities/community-edit.component';
import { CommunityViewComponent } from './communities/community-view.component';
import { ResourcesComponent } from './resources/resources.component';
import { ResourceEditComponent } from './resources/resource-edit.component';
import { ResourceQueueComponent } from './resources/resource-queue.component';
import { ResourceSubmitComponent } from './resources/resource-submit.component';
import { UserProfileComponent } from './users/user-profile.component';
import { UserProfileShortComponent } from './users/user-profile-short.component';
import { AdminComponent } from './admin.component';

export const routes: Routes = [
    { path: '', component: CommunitiesComponent },
    {
        path: 'missions',
        component: MissionsComponent,
        children: [
            { path: '', component: MissionListComponent },
            { path: ':id', component: MissionDetailComponent },
            { path: ':id/edit', component: MissionEditComponent },
        ],
        data: { title: 'Missions' }
    },
    { path: 'all-developers', component: DevelopersComponent, data: { title: 'All Angular Developers' } },
    { path: 'developers', component: ExpertsComponent, data: { title: 'Developers' } },
    { path: 'developers/:id', component: ExpertViewComponent },
    { path: 'developers/:id/edit', component: ExpertEditComponent },
    { path: 'events', component: EventsComponent, data: { title: 'Events' } },
    { path: 'events/submit', component: EventSubmitComponent, data: { title: 'Submit Event' } },
    { path: 'events/:id', component: EventViewComponent },
    { path: 'events/:id/edit', component: EventEditComponent },
    { path: 'communities', component: CommunitiesComponent, data: { title: 'Communities' } },
    { path: 'communities/submit', component: CommunitySubmitComponent, data: { title: 'Submit Community' } },
    { path: 'communities/:id', component: CommunityViewComponent },
    { path: 'communities/:id/edit', component: CommunityEditComponent },
    { path: 'resources', component: ResourcesComponent, data: { title: 'Resources' } },
    { path: 'resources/submit', component: ResourceSubmitComponent, data: { title: 'Submit Resource' } },
    { path: 'resources/queue', component: ResourceQueueComponent, data: { title: 'Resource Submission Queue' } },
    { path: 'resources/:category/:subcategory/:id', component: ResourceEditComponent },
    { path: 'profile', component: UserProfileComponent, data: { title: 'My Profile' } },
    { path: 'profile-short', component: UserProfileShortComponent, data: { title: 'My Profile' } },
    { path: 'admin', component: AdminComponent, data: { title: 'Manage Administrators' } },
];
