import {RouterConfig} from '@angular/router';
import {HomeComponent} from './home.component';
import {MissionsComponent} from './missions.component';
import {MissionListComponent} from './mission-list.component';
import {MissionDetailComponent} from './mission-detail.component';
import {MissionEditComponent} from './mission-edit.component';
import {ExpertsComponent} from './experts.component';
import {GroupsComponent} from './groups.component';

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
        path: '/groups',
        component: GroupsComponent
    }
];