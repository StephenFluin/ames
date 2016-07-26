import { bootstrap, platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { ApplicationRef, enableProdMode } from '@angular/core';
import { AmesAppComponent, environment } from './app/';
import { MyAppModule } from './app/app.module';
//import { FORM_DIRECTIVES, FORM_PROVIDERS } from '@angular/forms';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
//import {  } from '@angular/forms';

import { ROUTER_DIRECTIVES, provideRouter } from '@angular/router';
import {  routes } from './app/routes';



import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(MyAppModule);
/*
bootstrap(AmesAppComponent, {
    directives: [ROUTER_DIRECTIVES],
    pipes: [],
    providers: [
      provideForms(),
      provideRouter(routes),
      FIREBASE_PROVIDERS,
      defaultFirebase({
        apiKey: "AIzaSyCTOFGccvaEedz1Jykckni5T-WP7XixS_o",
        authDomain: "project-4800661445983438923.firebaseapp.com",
        databaseURL: "https://project-4800661445983438923.firebaseio.com/",
        storageBucket: "project-4800661445983438923.appspot.com",
      })
    ],
    precompile: [AmesAppComponent],  
  }
);
*/