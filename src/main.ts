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
  defaultFirebase('https://ames.firebaseio.com/'),
]);
