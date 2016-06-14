import {RouterConfig} from '@angular/router';
import {HomeComponent} from './home.component';
import {MissionsComponent} from './missions/missions.component';
import {MissionListComponent} from './missions/mission-list.component';
import {MissionDetailComponent} from './missions/mission-detail.component';
import {MissionEditComponent} from './missions/mission-edit.component';
import {ExpertsComponent} from './experts.component';
import {CommunitiesComponent} from './communities/communities.component';
import {LoginComponent} from './login.component';
import {ResourcesComponent} from './resources/resources.component';
import {ResourcesNewComponent} from './resources/resources-new.component';
import {CommunityEditComponent} from './communities/community-edit.component';


export const routes: RouterConfig = [
    {
        path: '/',
        component: HomeComponent,
        index: true
    },
    {
        path: '/missions',
        component: MissionsComponent,
        children: [
            {path: '/', component: MissionListComponent, index:true},
            {path: ':id', component: MissionDetailComponent},
            {path: ':id/edit', component: MissionEditComponent},
        ]
    },
    {
        path: '/experts',
        component: ExpertsComponent
    },
    { 
        path: '/communities',
        component: CommunitiesComponent,
    },
    {
        path: '/communities/:id/edit',
        component: CommunityEditComponent
    },
    {
        path: '/login',
        component: LoginComponent
    },
    {
        path: '/resources',
        component: ResourcesComponent
    },
    
    {
        path: '/resources/new',
        component: ResourcesNewComponent
    },
];