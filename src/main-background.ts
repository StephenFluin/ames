import { bootstrapApp, WORKER_APP_LOCATION_PROVIDERS } from '@angular/platform-browser';

import { provideRouter } from '@angular/router';
import { routes } from './app/routes';

import { AmesAppComponent, environment } from './app';

import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';


export function main() {
  bootstrapApp(AmesAppComponent, [
  provideRouter(routes),
  WORKER_APP_LOCATION_PROVIDERS,
  FIREBASE_PROVIDERS,
  defaultFirebase('https://ames.firebaseio.com/'),
]);
}