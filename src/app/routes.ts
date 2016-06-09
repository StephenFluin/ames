import {RouterConfig} from '@angular/router';
import {HomeComponent} from './home.component';
import {MissionsComponent} from './missions.component';
import {MissionDetailComponent} from './mission-detail.component';
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
            {path: ':id', component: MissionDetailComponent}
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
  /*{
    path: '/away',
    component: Away,
    index: true
  } */   
];