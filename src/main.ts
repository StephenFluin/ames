import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AmesAppComponent, environment } from './app/';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import { provideRouter } from '@angular/router';
import { routes } from './app/routes';



import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AmesAppComponent, [
  //disableDeprecatedForms(),
  //provideForms(),
  provideRouter(routes),
  FIREBASE_PROVIDERS,
  defaultFirebase({
    apiKey: "AIzaSyCTOFGccvaEedz1Jykckni5T-WP7XixS_o",
    authDomain: "project-4800661445983438923.firebaseapp.com",
    databaseURL: "https://project-4800661445983438923.firebaseio.com/",
    storageBucket: "project-4800661445983438923.appspot.com",
  }),
]);
